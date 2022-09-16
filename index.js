let page = require('./page.json');
let shell = require('shelljs');
let path = require('path');
let fs = require('fs');
let  {downloadMap4} = require('./download.js');
let {checkDir,getDirFilesNums,makeDir} = require('./file');
function createTs(dir,filename){
    let dirPath = path.resolve(path.join('./',dir,'/',filename));
    let filePath =path.resolve(path.join('./',dir,'/ts/',parseInt(filename)+'.ts')) ;

    let shellLS = `ffmpeg -i ${dirPath} -vcodec copy -acodec copy -f mpegts ${filePath}`;
    // return console.log(shellLS) 
    shell.exec(shellLS,{async: false})
}
function writeTxt(order,fileNumbers){
    let txtPath = path.join(__dirname,'/',order,'/', `${order}.txt`);
    fs.writeFileSync(txtPath, '')
    new Array(fileNumbers).fill(null).forEach((item,index)=>{
        let tsPath =  path.resolve(path.join(__dirname,'/',order,'/ts/', `${index}.ts`)).replace(/\\/g,'/');
        let str = `file ${tsPath}\n`
        fs.appendFileSync(txtPath, str)
    })
}
function concatVideo(order){
    let orderPath =   path.resolve(path.join(__dirname,'/',order,'/',`${order}.txt`));
    let resFileName = path.resolve(path.join(__dirname,'/',order,'/',`${order}.mp4`));
    let shellLs = `ffmpeg -f concat -safe 0 -i ${orderPath}  -acodec copy -vcodec copy -absf aac_adtstoasc ${resFileName}`;
    // console.log(orderPath,resFileName)
    shell.exec(shellLs,{async: false})
}
function reMoveFile(order){
    makeDir('大明王朝1566');
    let oldPath = path.resolve(path.join(order+'/'+`${order}.mp4`));
    let newPath = path.resolve(path.join('大明王朝1566','/',`${order}.mp4`));
    fs.rename(oldPath,newPath,function(err){
        if(err){
         throw err;
        }
        console.log('done!');
       });
}
page.forEach((item,index)=>{
    let obj = item;
    let name = obj.name.split(' ')[0];
    let files = obj.data.split(/\s/g);
    let order = name.split('1566')[1];
    // makeDir(`${order}/ts`)
    // createTs(order)\
    let nowFiles = getDirFilesNums(order); 
    if(order=='第1集'){
        return
    }
    reMoveFile(order)
    // concatVideo(order)
    // writeTxt(order,nowFiles)
    // console.log(nowFiles)
    // new Array(nowFiles).fill(null).forEach((item,index)=>{
    //     createTs(order,`${index}.mp4`);
    // })
    return
    // let rawLength = files.length,nowFiles = getDirFilesNums(order)
    // console.log(`${name}文件个数应当为${rawLength},实际为${nowFiles},${rawLength!=nowFiles?'有问题':''}`);
    
    // if(checkDir(order)){
    //     console.log(`${order}已经下载完毕`)
    // }else{
    //     console.log(`${order}正在下载中`);
    //     Promise.all(files.map((url,index)=>{
    //         return downloadMap4(url,`${order}`,{filename:`${index}.mp4`})
    //     })).then(()=>{
    //         console.log(`${order}已经下载完毕`)
    //     }).catch(e=>{
    //         console.error(`${order}下载出现问题`)
    //     })
    // }
})