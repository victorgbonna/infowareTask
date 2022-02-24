const User= require('./model')
const jwt= require('jsonwebtoken')
const config=require('../../config/config')
 
//create token
const createToken=(id, isAdmin)=>{
    return jwt.sign({id, isAdmin}, config.secretToken,{
        //for 24 hours
        expiresIn: 24 * 60 * 60
    })
}

//login user

const loginUser = async ({email, password}) =>{
    const user= await User.login(email,password)
    const token= createToken(user._id, user.isAdmin)
    // set for 24 hours
    return {user,token}
}
// helper to add to the user database
const addUser = async (userInput) =>{
    const user=new User(userInput)
    await user.save()
    return user
}

//get user
const getUser = async (userId) =>{
    const user= await User.findOne({_id:userId}).select('-password')
    return user
}
//get users
const getUsers = async ({conditions={}}) =>{
    const user= await User.find(conditions).select('-password')
    return user
}
//update user
const updateUserInfo = async ({userId, updates}) =>{
    const updatedInfo=await User.findOneAndUpdate({_id:userId}, updates, {
        new: true
    })
    return updatedInfo
    
}
//deleteUser
const deleteUser= async (userId)=>{
    const result=await User.deleteOne({
        _id:userId
    })
    return result
}

module.exports= {loginUser,addUser, getUser, getUsers, updateUserInfo, deleteUser}