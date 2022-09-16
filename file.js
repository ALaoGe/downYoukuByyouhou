const fs = require('fs');
function checkDir(dir){
    return fs.existsSync(dir)
   
};
function makeDir(dir){
    if(checkDir(dir)){
        return 
    }else{
        fs.mkdirSync(dir)
    }
};
function cleanDir(){};
function getDirFilesNums(dir){
    const files = fs.readdirSync(dir);
    return files.length-2
    return new Promise(()=>{

    })
}
module.exports= {
    makeDir:makeDir,
    checkDir:checkDir,
    getDirFilesNums:getDirFilesNums
}