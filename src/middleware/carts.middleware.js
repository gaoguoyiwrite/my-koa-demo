const {cartsFormatError} =require('../constant/err.type')

const validator = (rules)=>{
  return async (ctx,next)=>{
    try{
      ctx.verifyParams(rules)
    }catch(err){
      console.error(err)
      return ctx.app.emit('error',cartsFormatError,ctx)
    }
    await next() 
  }
}

module.exports={
  validator
}