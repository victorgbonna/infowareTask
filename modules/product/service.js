const Product= require('./model')

const addProduct = async (productInput) =>{
    const product=new Product(productInput)
    await product.save()
    return product
}
const getProduct = async (productId) =>{
    const product= await Product.findOne({_id:productId})
    return product
}

const getProducts = async ({conditions={}}) =>{
    const products= await Product.find(conditions)
    return products
}

//update product inventory
const updateProductInfo = async ({productId}) =>{
    
    const updates={$inc: {inventory: -1}}
    const updatedInfo=await Product.findOneAndUpdate({_id:productId, inventory:{$gt:0}}, updates, {
        new:true
    })
    return updatedInfo
}
module.exports={addProduct, getProduct, getProducts, updateProductInfo}