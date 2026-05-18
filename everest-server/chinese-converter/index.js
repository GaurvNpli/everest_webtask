const OpenCC = require('opencc-js')
const fs = require('fs')
const path = require('path')

const mode = process.argv[2]
const sourceFolder = process.argv[3]

if (!mode || !sourceFolder) {
  console.log('Usage: node index.js <mode> <folder>')
  console.log('Example: node index.js s2t ./files')
  console.log('  s2t = simplified to traditional')
  console.log('  t2s = traditional to simplified')
  process.exit(1)
}

if (mode !== 's2t' && mode !== 't2s') {
  console.log('Mode must be either s2t or t2s')
  process.exit(1)
}

const converter = OpenCC.Converter(
  mode === 's2t'
    ? { from: 'cn', to: 'tw' }
    : { from: 'tw', to: 'cn' }
)

const folderPath = path.join(__dirname, sourceFolder)
if (!fs.existsSync(folderPath)) {
  console.log(`Folder not found: ${sourceFolder}`)
  process.exit(1)
}

const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.txt'))

if (files.length === 0) {
  console.log('No .txt files found in folder')
  process.exit(1)
}

console.log(`Converting ${files.length} file(s) from ${mode === 's2t' ? 'Simplified → Traditional' : 'Traditional → Simplified'}`)
console.log('---')

// convert each file
files.forEach(file => {
  const filePath = path.join(folderPath, file)
  const content = fs.readFileSync(filePath, 'utf8')

  // convert the text
  const converted = converter(content)

  fs.writeFileSync(filePath, converted, 'utf8')
  console.log(`✓ Converted: ${file}`)
})

console.log('---')
console.log('Done!')