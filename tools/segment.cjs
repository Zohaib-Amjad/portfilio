const sharp = require('../client/node_modules/sharp')
const path = require('path')
const fs = require('fs')

const ASSETS = path.join(__dirname, '..', 'client', 'src', 'assets')
const OUT = path.join(__dirname, 'out')
fs.mkdirSync(OUT, { recursive: true })

const WORK_WIDTH = 300

async function buildMask(name) {
  const { data, info } = await sharp(path.join(ASSETS, name))
    .resize({ width: WORK_WIDTH })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const w = info.width
  const h = info.height
  const candidate = new Uint8Array(w * h)

  for (let i = 0; i < w * h; i += 1) {
    const r = data[i * 3]
    const g = data[i * 3 + 1]
    const b = data[i * 3 + 2]
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    const warm = r - b
    const isDarkSubject = luma < 46
    const isSkin = warm > 26 && luma > 50
    candidate[i] = isDarkSubject || isSkin ? 1 : 0
  }

  // Flood fill the person from the bottom centre.
  const mask = new Uint8Array(w * h)
  const stack = []
  const seedY = h - 3
  for (let x = Math.round(w * 0.35); x < Math.round(w * 0.65); x += 1) {
    const i = seedY * w + x
    if (candidate[i] && !mask[i]) {
      mask[i] = 1
      stack.push(i)
    }
  }

  while (stack.length) {
    const i = stack.pop()
    const x = i % w
    const y = (i - x) / w
    const neighbours = []
    if (x > 0) neighbours.push(i - 1)
    if (x < w - 1) neighbours.push(i + 1)
    if (y > 0) neighbours.push(i - w)
    if (y < h - 1) neighbours.push(i + w)
    for (const n of neighbours) {
      if (candidate[n] && !mask[n]) {
        mask[n] = 1
        stack.push(n)
      }
    }
  }

  return { mask, w, h }
}

function topBoundary(mask, w, h) {
  const tops = new Array(w).fill(null)
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      if (mask[y * w + x]) {
        // Require a run of subject pixels so speckles do not win.
        let run = 0
        for (let k = 0; k < 12 && y + k < h; k += 1) if (mask[(y + k) * w + x]) run += 1
        if (run >= 9) {
          tops[x] = y / h
          break
        }
      }
    }
  }
  return tops
}

function smooth(tops) {
  const out = tops.slice()
  for (let pass = 0; pass < 2; pass += 1) {
    for (let x = 1; x < out.length - 1; x += 1) {
      const a = out[x - 1]
      const b = out[x]
      const c = out[x + 1]
      if (a === null || b === null || c === null) continue
      // Preserve genuine silhouette cliffs such as the hair edge.
      if (Math.abs(a - c) > 0.08) continue
      out[x] = (a + 2 * b + c) / 4
    }
  }
  return out
}

async function run() {
  const name = process.argv[2] || 'portrait-base.png'
  const { mask, w, h } = await buildMask(name)
  const tops = smooth(topBoundary(mask, w, h))

  const meta = await sharp(path.join(ASSETS, name)).metadata()
  let d = ''
  for (let x = 0; x < w; x += 1) {
    if (tops[x] === null) continue
    const px = ((x + 0.5) / w) * meta.width
    const py = tops[x] * meta.height
    d += `${d ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)} `
  }

  const svg = `<svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg"><path d="${d}" fill="none" stroke="#ff1493" stroke-width="6"/></svg>`
  const overlay = await sharp(Buffer.from(svg)).resize(meta.width, meta.height, { fit: 'fill' }).png().toBuffer()
  const composed = await sharp(path.join(ASSETS, name)).composite([{ input: overlay }]).png().toBuffer()
  await sharp(composed).resize({ width: 700 }).png().toFile(path.join(OUT, `seg-${name}.png`))

  // Also dump the raw mask so coverage can be checked.
  const maskImage = Buffer.alloc(w * h)
  for (let i = 0; i < w * h; i += 1) maskImage[i] = mask[i] ? 255 : 0
  await sharp(maskImage, { raw: { width: w, height: h, channels: 1 } })
    .resize({ width: 460 })
    .png()
    .toFile(path.join(OUT, `mask-${name}.png`))

  const compact = []
  const STEP = 4
  for (let x = 0; x < w; x += STEP) {
    if (tops[x] === null) continue
    compact.push([Number(((x + 0.5) / w).toFixed(4)), Number(tops[x].toFixed(4))])
  }
  fs.writeFileSync(path.join(__dirname, `tops-${name}.json`), JSON.stringify(compact))
  console.log(name, 'points', compact.length)
}

run()
