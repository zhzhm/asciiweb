const fs = require('fs');
const {adocDir} = require('../config')

const ascii = {
    async toHtml5(ctx, next) {
        const path = ctx.request.path.substring(5).replace(/\.html$/,'.adoc')

        console.log(path)
        let aFile
        if(ctx.url.indexOf('ascii/')!=-1){
            aFile = path.substring(path.indexOf('ascii/')+6, path.length)
        }else{
            aFile = path.substring(1)
        }
        
        aFile = adocDir + '/' + aFile
        console.log(aFile)
        if(!fs.existsSync(aFile)){
            ctx.response.status=404
            ctx.body = {status: {code : 404, message: 'File Not Found'}}
            return
        }
        const asciidoctor = require('asciidoctor')() // (1)
        const registry = asciidoctor.Extensions.create()
        require('../services/puml')(registry)
        const html = asciidoctor.convertFile(aFile, { 'to_file': false, 'extension_registry': registry, 'header_footer': true}) // (2)
        ctx.body = '<html><body>' + html + '</body></html>'
    },
    async loadImage(ctx, next) {
        const path = ctx.request.path
        const fileName = 'umlimg/' + path.substring(8, path.length)
        console.log(fileName)
        if(!fs.existsSync(fileName)){
            ctx.response.status=404
            ctx.body = {status: {code : 404, message: 'File Not Found'}}
            return
        }
        ctx.type = 'png'
        let content  = fs.readFileSync(fileName)
        while(content==0){
            await sleep(300)
            content  = fs.readFileSync(fileName)
        }
        ctx.body = content
    },
    async loadCss(ctx, next){
        ctx.type = 'css'
        ctx.body = fs.readFileSync('public/asciidoctor.css')
    },
    async adoc(ctx, next){
        const path = ctx.request.path.substring(5)
        console.log(path + '==========================')
        ctx.type = 'txt'
        ctx.body = fs.readFileSync(adocDir + path)
        // fs.readFile(adocDir + path, (err, data)=>{
        //     if(err){
        //         ctx.response.status=404
        //         ctx.body = {status: {code : 404, message: 'File Not Found'}}
        //         return
        //     }
        //     ctx.body = data
        // })
    }
}

function sleep (timeout) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), timeout)
    })
}

module.exports = ascii