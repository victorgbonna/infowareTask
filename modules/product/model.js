const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    color:{
        type: String,
        lowercase:true,
        enum:['red', 'white', 'grey', 'blue', 'black', 'cream', 'green']
    },
    size:{
        type: String,
        enum:['M','L', 'XL', 'all'],
        default:'all',
        required:true
    },
    inventory:{
        type: Number,
        default:5
    },
    price:{
        type: Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Product',productSchema)