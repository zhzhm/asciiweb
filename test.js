const asciidoctor = require('asciidoctor')() // (1)
const registry = asciidoctor.Extensions.create()
const config = require('./config')

console.log(config)
require('./services/puml')(registry)

const content = 'http://asciidoctor.org[*Asciidoctor*] ' +
            'running on https://opalrb.com[_Opal_] ' +
            'brings AsciiDoc to Node.js!\n\n' +
            '[plantuml]\n' +
            '....\n' +
            '@startuml \n'+
            'class BlockProcessor\n' +
            'class DiagramBlock\n' +
            'class DitaaBlock\n' +
            'class PlantUmlBlock\n' +
            '\n' +
            'BlockProcessor <|-- DiagramBlock\n' +
            'DiagramBlock <|-- DitaaBlock\n' +
            'DiagramBlock <|-- PlantUmlBlock\n' +
            '@enduml\n' +
            '....\n' +
            'end aaa'

    // console.log(content)
    const html = asciidoctor.convert(content,{ 'to_file': 'out/a.html', 'extension_registry': registry }) // (2)
 