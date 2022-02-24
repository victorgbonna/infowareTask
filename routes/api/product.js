const express = require('express')
const { addProduct, getProduct, getProducts } = require('../../modules/product/service')
const { requireAdmin, requireAuth, guestOnly, requireCurrentUser } = require('../../middleware/authMiddleware')
const router = express.Router()

//add product
router.post('/add',requireAdmin, async (req, res) => {
    try{
      const product= await addProduct(req.body)
      return res.json({product})  
    } 
    catch(e){
      return res.json({error:e})
    }
})

//get product
router.get('/:id', async (req, res) => {
    try{
      const product= await getProduct(req.params.id)
      if(!product){
        return res.json({error:'no product'})
      }
      return res.json({product})  
    } 
    catch(e){
      return res.json({error:e})
    }
})

//get all product with conditions (/?name=400). it returns everything by default
router.get('/all/products', async (req, res) => {
    try{
        const conditions= req.query
        const products= await getProducts({conditions})
        return res.json({products})  
    } 
    catch(e){
      return res.json({error:e})
    }
})


module.exports=router