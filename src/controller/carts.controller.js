const {createOrUpdate,findCarts,updateCarts,removeCarts,selectAllCarts,unSelectAllCarts} = require('../service/carts.service')
const {cartsFormatError} = require('../constant/err.type')
class CartsController{
  async add(ctx){
    const user_id = ctx.state.user.id
    const goods_id = ctx.request.body.goods_id
    const res = await createOrUpdate(user_id, goods_id)
    ctx.body = {
      code:0,
      message:"添加成功",
      result:res
    }
  }

  async findAll(ctx){
    const {pageNum=1,pageSize=10} = ctx.request.query

    const res =await findCarts(pageNum,pageSize)
    
    ctx.body = {
      code:0,
      message:"获取列表成功",
      result:res
    }
  }
  
  async update(ctx){
    const {id} = ctx.request.params
    const{number,selected} = ctx.request.body
    if(number == undefined && selected == undefined){
      return ctx.app.emit('error',cartsFormatError,ctx)
    }
    const res = await updateCarts(id,number,selected)
    ctx.body = {
      code:0,
      message:'更新成功',
      result:res
    }
  }

  async remove(ctx){
    const {ids} = ctx.request.body

    const res = await removeCarts(ids)

    ctx.body={
      code:0,
      message:"删除成功",
      result:res
    }
  }

  async selectAll(ctx){
    const user_id = ctx.state.user.id
    const res =await selectAllCarts(user_id)

    ctx.body={
      code:0,
      message:"全部选中",
      result:res
    }
  }

  async unSelectAll(ctx){
    const user_id = ctx.state.user.id
    const res =await unSelectAllCarts(user_id)

    ctx.body={
      code:0,
      message:"全不选中",
      result:res
    }
  }


}
module.exports =new CartsController