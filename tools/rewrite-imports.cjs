const fs = require('fs')
const path = require('path')

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (/\.(jsx?|js)$/.test(entry.name)) acc.push(full)
  }
  return acc
}

const roots = ['components', 'data', 'hooks'].map((d) => path.join(__dirname, '..', d))
const files = roots.flatMap((root) => (fs.existsSync(root) ? walk(root) : []))

for (const file of files) {
  let source = fs.readFileSync(file, 'utf8')
  const before = source

  source = source.replace(/from ['"]\.\.\/data\//g, "from '@/data/")
  source = source.replace(/from ['"]\.\.\/assets\//g, "from '@/assets/")
  source = source.replace(/from ['"]\.\.\/hooks\//g, "from '@/hooks/")
  source = source.replace(/from ['"]\.\.\/components\//g, "from '@/components/")

  // Same-folder component imports: './Foo' -> '@/components/Foo' only inside components/
  if (file.includes(`${path.sep}components${path.sep}`)) {
    source = source.replace(
      /from ['"]\.\/([^'"]+)['"]/g,
      (_match, name) => `from '@/components/${name}'`,
    )
  }

  if (source !== before) {
    fs.writeFileSync(file, source)
    console.log('updated', path.relative(path.join(__dirname, '..'), file))
  }
}
