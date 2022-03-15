const path = require('path')

const {fillUploadError,filetypeUnsupported,publishGoodsError,invalidGoodsId}  = require('../constant/err.type')
const {createGoods,updateGoods,removeGoods,restoreGoods,findGoods} = require('../service/goods.service')

class GoodsController{
  async upload(ctx,next){
    const {file} = ctx.request.files
    const fileType = ['image/jpeg','image/png','image/webp']
    if(file){
      if(!fileType.includes(file.type)){
        return ctx.app.emit('error',filetypeUnsupported,ctx)
      }
      ctx.body={
        code: '0',
        message: '图片上传成功',
        result:{
          goods_img:path.basename(file.path)
        }
      }
    }else{
      return ctx.app.emit('error',fillUploadError,ctx)
    }
  }

  async create(ctx){
    try{
      console.log(ctx.request.body)
      const {createdAt,updatedAt,...res} = await createGoods(ctx.request.body)
      console.log(res)
      ctx.body = {
        code:0,
        message:"发布成功",
        result:""
      }
    }catch(err){
      console.error(err)
      return ctx.app.emit('error',publishGoodsError,ctx)
    }
  }

  async update(ctx){
    try{
     const res =  await updateGoods(ctx.params.id,ctx.request.body)
     if(res){
       ctx.body = {
         code:0,
         message:"修改商品成功",
         result:''
       }
     }else{
      return ctx.app.emit('error',invalidGoodsId,ctx)
     }
    }catch(err){
      console.error(err)
    }
  }

  async remove(ctx){
    const res = await removeGoods(ctx.params.id)
    if(!res){
      ctx.body = {
        code:0,
        message:"下架成功",
        result:""
      }
    }else{
      return ctx.app.emit('error',invalidGoodsId,ctx)
    }
  }

  async restore(ctx){
    const res = await restoreGoods(ctx.params.id)
    if(!res){
      ctx.body = {
        code:0,
        message:"上架成功",
        result:""
      }
    }else{
      return ctx.app.emit('error',invalidGoodsId,ctx)
    }
  }

  async findAll(ctx){
    const {pageNum = 1,pageSize = 10} = ctx.request.query

    const res = await findGoods(pageNum,pageSize)

    ctx.body={
      code:0,
      message:"获取数据成功",
      result:res
    }
  }
}

module.exports =new GoodsController