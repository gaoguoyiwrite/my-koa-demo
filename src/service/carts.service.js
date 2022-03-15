const {Op} = require('sequelize')

const Carts = require('../model/carts.model')
const Goods = require('../model/goods.model')


class CartsService{
  async createOrUpdate(user_id, goods_id){
   let res = await Carts.findOne({
      where:{
        [Op.and]:{
          user_id,
          goods_id
        }
      }
    })
    if(res){
      await res.increment('number')
      return await res.reload()
    }else{
      return await Carts.create({
        user_id,
        goods_id
      })
    }
  }

  async findCarts(pageNum,pageSize){
    const offset = (pageNum - 1) * pageSize

    const {count,rows} = await Carts.findAndCountAll({
      attributes:['id','number','selected'],
      offset: offset,
      limit:pageSize * 1,
      include:{
        model:Goods,
        as:"goods_info",
        attributes:['id','goods_name','goods_price','goods_img'],
      }
    })
    return {
      pageNum,
      pageSize,
      total:count,
      rows
    }
  }

  async updateCarts(id,number,selected){
    const res = await Carts.findOne({wherr:{id:id}})
    if(!res) return ""
    number !== undefined ? ( res.number = number) : ''
    selected !== undefined  ? (res.selected = selected) : ''
    return await res.save()
  }

  async removeCarts(ids){
    return await Carts.destroy({where: {
      id:{
        [Op.in]:ids
      }
    }})
  }

  async selectAllCarts(user_id){
    return await Carts.update({selected:true},{where:{user_id}})
  }

  async unSelectAllCarts(user_id){
    return await Carts.update({selected:false},{where:{user_id}})
  }
}

module.exports =new CartsService