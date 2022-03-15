const {Sequelize} = require('sequelize');
const {MYSQL_HOST,MYSQL_PORT,MYSQL_USER,MySQL_PWD,MySQL_DB} = require('../config/config.default')

const seq = new Sequelize(MySQL_DB , MYSQL_USER, MySQL_PWD,{
  host: MYSQL_HOST,
  dialect:'mysql'
})

// seq.authenticate().then(()=>{
//   console.log('成功')
// }).catch(()=>{
//   console.log('失败')
// })

module.exports =seq