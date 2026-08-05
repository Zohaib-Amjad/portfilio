const sharp = require('../client/node_modules/sharp')
const path = require('path')
const fs = require('fs')

const ASSETS = path.join(__dirname, '..', 'client', 'src', 'assets')
const OUT = path.join(__dirname, 'out')
fs.mkdirSync(OUT, { recursive: true })

const jobs = [
  { src: 'portrait-base.png', out: 'portrait-base-green.webp', top: 'silhouette.json', shape: 'shape-base.json' },
  { src: 'portrait-hover.png', out: 'portrait-hover-green.webp', top: 'silhouette-hover.json', shape: 'shape-hover.json' },
]

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
const smoothstep = (a, b, v) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

function makeSampler(points) {
  return (input) => {
    if (input <= points[0][0]) return points[0][1]
    const last = points[points.length - 1]
    if (input >= last[0]) return last[1]
    for (let i = 1; i < points.length; i += 1) {
      if (input <= points[i][0]) {
        const [x0, y0] = points[i - 1]
        const [x1, y1] = points[i]
        return y0 + ((y1 - y0) * (input - x0)) / (x1 - x0)
      }
    }
    return last[1]
  }
}

function loadShape(topFile, shapeFile) {
  const top = JSON.parse(fs.readFileSync(path.join(__dirname, topFile), 'utf8'))
  const shape = JSON.parse(fs.readFileSync(path.join(__dirname, shapeFile), 'utf8'))
  return {
    headTop: makeSampler(top),
    torsoTop: makeSampler(shape.torso),
    headHalfWidth: makeSampler(shape.headHalfWidth),
    headCenter: shape.headCenter,
  }
}

// 1 where the pixel is background, 0 where it belongs to the person, feathered between.
function backgroundWeight(shape, nx, ny, feather) {
  const aboveTorso = 1 - smoothstep(shape.torsoTop(nx) - feather, shape.torsoTop(nx) + feather, ny)
  if (aboveTorso < 0.004) return 0

  const halfWidth = shape.headHalfWidth(ny)
  const outsideHeadColumn = smoothstep(halfWidth - feather, halfWidth + feather, Math.abs(nx - shape.headCenter))
  const aboveHead = 1 - smoothstep(shape.headTop(nx) - feather, shape.headTop(nx) + feather, ny)
  const outsideHead = Math.max(outsideHeadColumn, aboveHead)

  return aboveTorso * outsideHead
}

async function recolor(job) {
  const shape = loadShape(job.top, job.shape)
  const { data, info } = await sharp(path.join(ASSETS, job.src)).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const feather = 6 / height

  for (let y = 0; y < height; y += 1) {
    const ny = y / height
    for (let x = 0; x < width; x += 1) {
      const weight = backgroundWeight(shape, x / width, ny, feather)
      if (weight < 0.004) continue

      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Sky and city are cool; skin and warm window lights stay untouched.
      const coolness = smoothstep(-2, 12, b - r)
      const strength = 0.85 * weight * coolness
      if (strength < 0.004) continue

      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
      data[i] = Math.round(r + (luma * 0.55 - r) * strength)
      data[i + 1] = Math.round(g + (luma * 1.13 - g) * strength)
      data[i + 2] = Math.round(b + (luma * 0.68 - b) * strength)
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality: 92, effort: 5 })
    .toFile(path.join(ASSETS, job.out))

  await sharp(path.join(ASSETS, job.out)).resize({ width: 560 }).png().toFile(path.join(OUT, `preview-${job.out}.png`))
  console.log('wrote', job.out)
}

Promise.all(jobs.map(recolor))
