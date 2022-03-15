const Addr = require('../model/addr.model')

class AddrService{
  async createAddr(params){
    return await Addr.create(params)
  }

  async findAllAddr(user_id){
    return await Addr.findAll({
      where:{user_id},
      attributes:['id','consignee','phone','address','is_default'],
    })
  }

  async updateAddr(id,addr){
    return await Addr.update(addr,{where:{id:id}})
  }

  async removeAddr(id){
    return await Addr.destroy({where:{id}})
  }

  async setDefaultAddr(id,user_id){
    await Addr.update({is_default:false},{where:{user_id}})

    return await Addr.update({is_default:true},{where:{id}})
  }
}

module.exports = new AddrService