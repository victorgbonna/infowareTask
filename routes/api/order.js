const express = require('express')
const { addOrder, getOrder, getOrders } = require('../../modules/order/service')
const { requireAdmin, requireAuth, guestOnly, requireCurrentUser } = require('../../middleware/authMiddleware')

const router = express.Router()

//add order
router.post('/add',requireCurrentUser, async (req, res) => {
    try{
      const {orderedUser, orderedProduct}= req.body
      const order= await addOrder({userId:orderedUser, productId:orderedProduct})
      if(!order){
        return res.json({'error':'invalid data'})
      }
      if(order.error){
        return res.json({error:order.error})
      }
      return res.json({order})  
    } 
    catch(e){
      console.log(e)
      return res.json({error:e})
    }
})

//get order
router.get('/:id',requireCurrentUser, async (req, res) => {
    try{
      const order= await getOrder(req.params.id)
      return res.json({order})
    } 
    catch(e){
      return res.json({error:e})
    }
})

//get order
router.get('/all/orders',requireAuth, async (req, res) => {
    try{
        const conditions=req.query||{}
        const orders= await getOrders({conditions})
        return res.json({orders})  
    } 
    catch(e){
      console.log(e)
      return res.json({error:e})
    }
})
//get order by user id
router.get('/all/orders/user/:id',requireCurrentUser, async (req, res) => {
  const userId= req.params.id
  try{
    const orders= await getOrders({conditions:{orderedUser:userId}})
    return res.json({orders})
  } 
  catch(e){
    return res.json({error:e})
  }
})
//get order by product id
router.get('/all/orders/product/:id',requireAuth, async (req, res) => {
  const productId= req.params.id
  try{
    const orders= await getOrders({conditions:{orderedProduct:productId}})
    return res.json({orders})
  } 
  catch(e){
    return res.json({error:e})
  }
})
module.exports=router