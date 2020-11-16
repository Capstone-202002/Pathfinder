const fs = require('fs')

var path = 'C:\\Users\\Jun\\Downloads\\다운로드 (4).jpg'

const ads_suffix = "Zone.Identifier"

var result = fs.readFileSync(`${path}:${ads_suffix}`, { encoding: 'utf-8' })

var re = /(ReferrerUrl=).*/
var arr = re.exec(result)

console.log(arr[0].substring(12))