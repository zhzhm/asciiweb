const plantuml = require('node-plantuml');
const fs = require('fs');
const shajs = require('sha.js')
let counter = 0
module.exports = function (registry) {
    registry.block(function () {
      const self = this
      self.named('plantuml')
      self.onContext(['listing', 'literal'])
      self.process(function (parent, reader) {
        const lines = reader.$read()
        const sha1 = shajs('sha1').update(lines).digest('hex')
        const imageFile = 'umlimg/'+sha1+'.png'
        if(!fs.existsSync(imageFile)){
          console.log("generate: "+imageFile)
          const generator = plantuml.generate(lines);
          const out = fs.createWriteStream(imageFile, {emitClose: true})
          generator.out.pipe(out);
        }
        return self.createImageBlock(parent, {target: '/umlimg/' + sha1+'.png', alt: 'uml'})
      })
    })
  }