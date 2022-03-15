const bcrypt = require('bcryptjs');
const {getUserInfo} = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExists,
  userRegisterError,
  userIsNotExist,
  userLoginError,
  invalidPassword
} = require('../constant/err.type.js')

const userValidator = async (ctx,next) =>{
  const {user_name,password} = ctx.request.body
  if(!user_name || !password){
    console.error('用户名或密码为空',ctx.request.body)
    ctx.app.emit('error',userFormateError,ctx)
    return 
  }
  await next()
}

const verifyUser = async (ctx,next) =>{
  const {user_name} = ctx.request.body
  try{
    const res= await getUserInfo({user_name})
    if(res){
      console.error('用户名已经存在',{user_name})
      ctx.app.emit('error',userAlreadyExists,ctx)
      return
    }
  }catch(err){
    console.error('获取用户信息错误',err)
    ctx.app.emit('error', userRegisterError,ctx)
    return 
  }
  await next()
}

const cryptPassword =async (ctx,next)=>{
  const {password} = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx,next)=>{
  const {user_name,password} = ctx.request.body
  try{
    const res = await getUserInfo({user_name})
    if(!res){
      console.error('用户名不存在')
      ctx.app.emit('error',userIsNotExist,ctx)
      return 
    }
    if(!bcrypt.compareSync(password, res.password)){
      ctx.app.emit('error',invalidPassword,ctx)
      return 
    }
  }catch(err){
    console.error(err)
    ctx.app.emit('error',userLoginError,ctx)
    return
  }
  await next()
}
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}