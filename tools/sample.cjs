const sharp = require('../client/node_modules/sharp')
const path = require('path')

const ASSETS = path.join(__dirname, '..', 'client', 'src', 'assets')

const points = {
  'sky top-left': [0.08, 0.06],
  'sky bright mid-left': [0.14, 0.2],
  'cloud dark upper': [0.3, 0.05],
  'cloud right': [0.8, 0.15],
  'sky above head': [0.47, 0.06],
  'horizon left': [0.12, 0.45],
  'city left': [0.08, 0.62],
  'castle right': [0.85, 0.55],
  hair: [0.47, 0.17],
  'skin cheek': [0.38, 0.33],
  'skin forehead': [0.47, 0.24],
  beard: [0.47, 0.46],
  'shirt left': [0.3, 0.8],
  'shirt centre': [0.47, 0.75],
  'lightning core': [0.06, 0.35],
}

async function run() {
  const name = process.argv[2] || 'portrait-base.png'
  const { data, info } = await sharp(path.join(ASSETS, name)).removeAlpha().raw().toBuffer({ resolveWithObject: true })

  for (const [label, [nx, ny]] of Object.entries(points)) {
    const x = Math.round(nx * (info.width - 1))
    const y = Math.round(ny * (info.height - 1))
    const i = (y * info.width + x) * 3
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const luma = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b)
    console.log(
      label.padEnd(20),
      `rgb(${String(r).padStart(3)},${String(g).padStart(3)},${String(b).padStart(3)})`,
      'luma', String(luma).padStart(3),
      'b-r', String(b - r).padStart(4),
      'r-b', String(r - b).padStart(4),
    )
  }
}

run()
