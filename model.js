const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        maxlength: [50, 'Email can only take up to 50 characters'],
        required: [true,'Email is required']
    },
    phone:{
        type: String,
        unique:true,
        maxlength: [50, 'Phone number can only take up to 50 characters'],
        required: [true,'Phone number is required']
    },
    password:{
        type: String,
        unique:true,
        maxlength: [50, 'Password can only take up to 50 characters'],
        required: [true,'password number is required']
    },
    profile:{
        type: String,
        default:'default.png'
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}) 
userSchema.path('email').validate(async(email) => {
    const emailCount=await mongoose.models.User.countDocuments({email})
    return !emailCount
},'Email already exists')
userSchema.path('phone').validate(async(phone) => {
    const phoneCount=await mongoose.models.User.countDocuments({phone})
    return !phoneCount
},'Phone already exists')

module.exports=mongoose.model('User',userSchema)