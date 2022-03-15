const Router = require('koa-router')

const {validator} = require('../middleware/carts.middleware')
const {auth} = require("../middleware/auth.middleware")
const {add,findAll,update,remove,selectAll,unSelectAll} = require('../controller/carts.controller')
const router = new Router({prefix:'/carts'})

router.post('/',auth,validator({goods_id:'number'}),add)

//获取列表
router.get('/',auth,findAll)

//更新
router.patch('/:id',auth,validator({
  number:{type:'number',required:false},
  selected:{type:'boolean',required:false}
}),update)

//删除
router.delete('/',auth,validator({
  ids:'array',
}),remove)

//全选
router.post('/selectAll',auth,selectAll)
//全不选
router.post('/unSelectAll',auth,unSelectAll)

module.exports = router