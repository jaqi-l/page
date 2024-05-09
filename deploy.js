const shell = require('shelljs')
const fs = require("fs");
const moment = require('moment');

const filePath = './docs/.vitepress/config.mts'
// 当前要提交的版本号
let commitVersion = ''

// 提交时候的日期
var currentDate = moment(Date.now()).format('YYYY.MM.DD').slice(2)

let readFile = fs.createReadStream(filePath, {
  flags: 'r', //默认 'r' 读
  encoding: 'utf8' //默认null
}) // 创建一个读取流

// 监听正在读取
readFile.on('data', (data) => {
  let raw = data.match(/(@)(\d{2}.\d{2}.\d{2}).(\d{1,})/i)
  let date = raw[2]
  let version = raw[3]
  if (date == currentDate) {
    // 如果今天提交过，版本号+1
    commitVersion = `${currentDate}.${Number(version) + 1}`
  } else {
    commitVersion = currentDate + '.1'
  }
  fs.writeFileSync(filePath, data.replace(/@\d{2}.\d{2}.\d{2}.\d{1,}/, `@${commitVersion}`))

  shell.chmod(777, './shell.sh');

  shell.exec('./shell.sh')

  shell.exit(1)

})