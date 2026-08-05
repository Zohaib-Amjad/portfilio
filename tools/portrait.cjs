const sharp = require('../client/node_modules/sharp')
const path = require('path')
const fs = require('fs')

const ASSETS = path.join(__dirname, '..', 'client', 'src', 'assets')
const OUT = path.join(__dirname, 'out')
fs.mkdirSync(OUT, { recursive: true })

// Normalized silhouette control points: [x, topY] describing the subject outline.
// Filled in after measurement.
const SILHOUETTE_FILE = process.env.SILHOUETTE || 'silhouette.json'
const SILHOUETTE = JSON.parse(fs.readFileSync(path.join(__dirname, SILHOUETTE_FILE), 'utf8'))

function silhouetteAt(nx) {
  const pts = SILHOUETTE
  if (nx <= pts[0][0] || nx >= pts[pts.length - 1][0]) return null
  for (let i = 1; i < pts.length; i += 1) {
    if (nx <= pts[i][0]) {
      const [x0, y0] = pts[i - 1]
      const [x1, y1] = pts[i]
      const t = (nx - x0) / (x1 - x0)
      return y0 + (y1 - y0) * t
    }
  }
  return null
}

async function grid(name, out, region) {
  const src = path.join(ASSETS, name)
  const meta = await sharp(src).metadata()
  const [x0, y0, x1, y1] = region || [0, 0, 1, 1]
  const left = Math.round(meta.width * x0)
  const top = Math.round(meta.height * y0)
  const width = Math.round(meta.width * (x1 - x0))
  const height = Math.round(meta.height * (y1 - y0))

  const cropped = await sharp(src).extract({ left, top, width, height }).png().toBuffer()

  const step = x1 - x0 < 0.7 ? 2 : 5
  let marks = ''
  for (let p = 0; p <= 100; p += step) {
    const gy = meta.height * (p / 100) - top
    if (gy >= 0 && gy <= height) {
      const strong = p % 10 === 0
      marks += `<line x1="0" y1="${gy}" x2="${width}" y2="${gy}" stroke="${strong ? '#ff2d2d' : '#00ff66'}" stroke-width="${strong ? 3 : 1.2}"/>`
      marks += `<text x="6" y="${gy - 5}" font-size="26" fill="#ffff00" font-family="monospace">${p}</text>`
    }
    const gx = meta.width * (p / 100) - left
    if (gx >= 0 && gx <= width) {
      const strong = p % 10 === 0
      marks += `<line x1="${gx}" y1="0" x2="${gx}" y2="${height}" stroke="${strong ? '#3399ff' : '#0a5c99'}" stroke-width="${strong ? 3 : 1.2}"/>`
      marks += `<text x="${gx + 4}" y="${height - 8}" font-size="26" fill="#33ccff" font-family="monospace">${p}</text>`
    }
  }
  await render(cropped, width, height, marks, out)
}

async function curve(name, out) {
  const src = path.join(ASSETS, name)
  const { width, height } = await sharp(src).metadata()
  let d = ''
  for (let i = 0; i <= 200; i += 1) {
    const nx = i / 200
    const ny = silhouetteAt(nx)
    if (ny === null) continue
    d += `${d ? 'L' : 'M'}${(nx * width).toFixed(1)},${(ny * height).toFixed(1)} `
  }
  const marks = `<path d="${d}" fill="none" stroke="#ff1493" stroke-width="6"/>`
  await render(src, width, height, marks, out)
}

async function render(src, width, height, marks, out) {
  const overlay = await sharp(
    Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${marks}</svg>`),
  )
    .resize(width, height, { fit: 'fill' })
    .png()
    .toBuffer()

  const composed = await sharp(src).composite([{ input: overlay }]).png().toBuffer()
  await sharp(composed).resize({ width: 760 }).png().toFile(path.join(OUT, out))
  console.log('wrote', out)
}

const mode = process.argv[2]
const region = process.argv[4] ? process.argv.slice(4).map(Number) : null
if (mode === 'grid') grid(process.argv[3], 'grid.png', region)
if (mode === 'curve') curve(process.argv[3], 'curve.png')
