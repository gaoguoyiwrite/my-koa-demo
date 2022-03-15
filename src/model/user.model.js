const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

const User = seq.define('zd_user',{
  user_name: {
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    comment:'用户名唯一'
  },
  password: {
    type:DataTypes.CHAR(64),
    allowNull:false,
    comment:'密码'
  },
  is_admin:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:0,
    comment: '是否为管理员'
  }
})

//强制同步数据库
//User.sync({force:true}) 

module.exports = User