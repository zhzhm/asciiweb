const router = require('koa-router')()
const ascii = require('../controller/ascii')

router.get('/', (ctx, next) => {
  ctx.response.redirect('/html/index.adoc')
})

router.get('/string', (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/html/**/*.adoc', ascii.toHtml5 )
router.get('/html/*.adoc', ascii.toHtml5 )
router.get('/html/**/*.html', ascii.toHtml5)
router.get('/html/*.html', ascii.toHtml5)

router.get('/html/', (ctx, next) => {
  ctx.response.redirect('/html/index.adoc')
})

router.get('/umlimg/*', ascii.loadImage)

router.get('/**/asciidoctor.css', ascii.loadCss)

router.get('/adoc/**/*.adoc', ascii.adoc)
router.get('/adoc/*.adoc', ascii.adoc)

module.exports = router
