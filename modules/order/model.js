const mongoose= require('mongoose')

const orderSchema= new mongoose.Schema({
    orderedProduct:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    orderedUser:{
        // type: this,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}) 
const populateData = function (next) {
    this.populate(
      "orderedUser",
      "_id name email profile"
    ),
    this.populate(
        "orderedProduct",
        "_id name color size inventory price"
    );
    next();
};

orderSchema.pre("find", populateData).pre("findOne", populateData)

module.exports=mongoose.model('Order',orderSchema)