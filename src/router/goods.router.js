const Router = require('koa-router')

const {auth,hadAdminPermissions} = require('../middleware/auth.middleware')

const {validator} =require('../middleware/goods.middleware')

const {upload,create,update,remove,restore,findAll} = require('../controller/goods.controller')

const router = new Router({prefix:'/goods'})

//上传图片
router.post('/upload',auth,hadAdminPermissions,upload)
//上架
router.post('/',auth,hadAdminPermissions,validator,create)
//更新商品
router.put('/:id',auth,hadAdminPermissions,validator,update)
//硬删除
//router.delete('/:id',auth,hadAdminPermissions,remove)
//软删除
router.post('/:id/off',auth,hadAdminPermissions,remove)
//上架
router.post('/:id/on',auth,hadAdminPermissions,restore)
//获取列表
router.get('/',findAll)
module.exports = router