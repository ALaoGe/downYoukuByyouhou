const shell = require('shelljs')
const path = require('path')
const colors = require('colors')
const fs = require("fs")
return
shell.rm('-rf', './ts');
fs.mkdirSync(`${__dirname}/ts`)
const pathUrl = path.join(__dirname , 'run.bat')
console.log(colors.blue('------------开始将file文件里的MP4格式转为ts，并生成ts文件夹，将ts放入其中'))
shell.exec(pathUrl,{async: false})
console.log(colors.green('------------将file文件里的MP4格式转为ts完成'))
console.log(colors.blue('------------开始将ts文件夹里的ts路径生成对应的ffmpeg文件格式并放入test.txt'))
fs.writeFileSync(path.join(__dirname, 'test.txt'), '')
const fileList = fs.readdirSync(path.join(__dirname, 'ts'))
fileList.forEach(val => {
	const url = path.join(__dirname, 'ts' ,val).replace(/\\/g,'/')
	const str = `file ${url}\n`
	fs.appendFileSync(path.join(__dirname, 'test.txt'), str)
})
console.log(colors.green('------------test.txt准备完成'))
console.log(colors.blue('------------开始将ts合并，并将格式转回mp4'))
shell.exec('ffmpeg -f concat -safe 0 -i test.txt  -acodec copy -vcodec copy -absf aac_adtstoasc merge.mp4', { async: false })
console.log(colors.green('------------合并mp4完成'))