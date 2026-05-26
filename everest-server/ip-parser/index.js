const fs = require('fs')
const path = require('path')
const https = require('https')
const geoip = require('fast-geoip')

// download the log file  
function downloadLog(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', reject)
  })
}

async function main() {
  const logFile = path.join(__dirname, 'ip.txt')

  if (!fs.existsSync(logFile)) {
    console.log('Downloading IP log file...')
    await downloadLog('https://files.idigest.app/ip.txt', logFile)
    console.log('Downloaded!')
  }

  const content = fs.readFileSync(logFile, 'utf8')
  
  const ips = content.split('\n').map(ip => ip.trim()).filter(ip => ip)

  console.log(`Found ${ips.length} IPs`)
  console.log('Looking up regions...')
  console.log('---')

  const regionCount = {}

// IP
  for (const ip of ips) {
    try {
      const geo = await geoip.lookup(ip)
      if (geo) {
        // countryname
        const country = geo.country || 'Unknown'
        const region = geo.region && geo.region !== geo.country 
          ? geo.region 
          : null
        
        const key = region ? `${country} / ${region}` : country
        regionCount[key] = (regionCount[key] || 0) + 1
      } else {
        regionCount['Unknown'] = (regionCount['Unknown'] || 0) + 1
      }
    } catch (err) {
      regionCount['Unknown'] = (regionCount['Unknown'] || 0) + 1
    }
  }

  // sorting
  const sorted = Object.entries(regionCount)
    .sort((a, b) => b[1] - a[1])

  console.log('IP Regions:')
  console.log('---')
  sorted.forEach(([region, count]) => {
    const bar = '█'.repeat(count)
    console.log(`  ${bar} ${count}x — ${region}`)
  })
}

main() 
