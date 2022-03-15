const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router/index')
const errorHandler = require( './errorHandler')

const app = new Koa()

app.use(KoaBody({
  multipart:true,
  formidable:{
    uploadDir:path.join(__dirname, '../upload'),
    keepExtensions:true,
  },
  parsedMethods:['POST','PUT','PATCH','DELETE']
}))

app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

app.on('error',errorHandler)

module.exports =app