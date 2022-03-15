const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

const Addr = seq.define('zd_addr', {
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    comment:'用户ID'
  },
  consignee:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:1,
    comment:'收货人'
  },
  phone:{
    type:DataTypes.CHAR(11),
    allowNull:false,
    comment:'收货人手机'
  },
  address:{
    type:DataTypes.STRING,
    allowNull:false,
    comment:'收货人地址'
  },
  is_default:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false,
    comment:'是否为默认地址'
  }
})

//Addr.sync({force:true})

module.exports = Addr