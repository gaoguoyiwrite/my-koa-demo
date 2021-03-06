const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../config/config.default')
const {tokenExporedError,invalidTok,hasNotAdminPermission} = require('../constant/err.type')
const auth =async (ctx,next)=>{
  const {authorization} = ctx.request.header
  const token = authorization.replace('Bearer ','')
  
  try{
    const user = jwt.verify(token,JWT_SECRET)
    ctx.state.user = user
  }catch(err){
    switch(err.name){
      case "TokenExporedError":
        console.error('token已过期',err)
        return ctx.app.emit('error',tokenExporedError,err)
      case "JsonWebTokenError":
        console.error('无效token',err)
        return ctx.app.emit('error',invalidToke,err)
    }
  }
 
  await next()
}

const hadAdminPermissions = async (ctx,next)=>{
  const {is_admin} = ctx.state.user
  if(!is_admin){
    console.error('该用户没有管理员权限',ctx.state.user)
    return ctx.app.emit('error',hasNotAdminPermission,ctx)
  }
  next()
}

module.exports = {
  auth,
  hadAdminPermissions
}