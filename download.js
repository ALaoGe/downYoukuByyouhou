const download = require('download');
function downloadMap4(url,name,options){
    return download(url,name,options)
}   
module.exports= {
    downloadMap4
}