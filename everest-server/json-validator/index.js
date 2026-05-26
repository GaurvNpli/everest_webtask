const fs = require('fs')
const path = require('path')

const fileName = process.argv[2]

if (!fileName) {
  console.log('Usage: node index.js <filename>')
  console.log('Example: node index.js test.json')
  process.exit(1)
}

// building path
const filePath = path.join(__dirname, fileName)

if (!fs.existsSync(filePath)) {
  console.log(`File not found: ${fileName}`)
  process.exit(1)
}

const fileContents = fs.readFileSync(filePath, 'utf8')

try {
  JSON.parse(fileContents)
  console.log(`✓ ${fileName} is valid JSON`)
} catch (err) {
  console.log(`✗ ${fileName} is not valid JSON`)
  console.log(`  Error: ${err.message}`)
} 
