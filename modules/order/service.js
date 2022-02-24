const { updateProductInfo } = require('../product/service')
const { getUser } = require('../user/service')
const Order= require('./model')

const addOrder = async ({userId, productId}) =>{
    const user=  await getUser(userId)
    if(!user){
        return null
    }
    const product= await updateProductInfo({productId})
    if(!product){
        return {error:'item not available'}
    } 
    const order=new Order({orderedUser:userId,orderedProduct:productId})
    await order.save()
    return order
}
const getOrder = async (orderId) =>{
    const order= await Order.findOne({_id:orderId})
    return order
}

const getOrders = async ({conditions={}}) =>{
    const orders= await Order.find(conditions)
    return orders
}


module.exports={addOrder, getOrder, getOrders}