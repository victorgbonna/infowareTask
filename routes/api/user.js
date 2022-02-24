const express = require('express')
const { loginUser, addUser, getUser, getUsers, updateUserInfo, deleteUser } = require('../../modules/user/service')
const jwt= require('jsonwebtoken')
const { requireAdmin, requireAuth, guestOnly, requireCurrentUser } = require('../../middleware/authMiddleware')
const router = express.Router()


console.log('hello')
//login user route
router.post('/login', guestOnly, async (req, res) => {
    try{
      const {user,token}=await loginUser(req.body)
      res.cookie('jwt', token, {httpOnly:true, maxAge: 24 * 60 * 60 * 1000})
      return res.json({user})
    }
    catch(e){
      console.log(e)
      return res.json({error:'return json'})
  }
})
//logout user route
router.get('/logout',requireAuth, async (req, res) => {
  try{
    res.cookie('jwt', '', {maxAge:1})
    return res.json({message:'logged out successfully'})
  }
  catch(e){
    console.log(e)
    return res.json({error:e})
}
})

//add admin
router.post('/add/admin', async (req, res) => {
  try{
    req.body.isAdmin=true
    const user= await addUser(req.body)
    return res.json({user})  
  } 
  catch(e){
    return res.json({error:e})
  }
})

//add user
router.post('/add',guestOnly, async (req, res) => {
  if(req.body.isAdmin){
    delete req.body.isAdmin
  }
  try{
    const user= await addUser(req.body)
    return res.json({user})  
  } 
  catch(e){
    return res.json({error:e})
  }
})

//get user
router.get('/:id',requireCurrentUser, async (req, res) => {
  try{
    const user= await getUser(req.params.id)
    if(!user){
      return res.json({error:'no user'})
    }
    return res.json({user})  
  } 
  catch(e){
    console.log(e)
    return res.json({error:e})
  }
})
// get users with conditions e.g /?name=victorogbonna. it returns everything by default
router.get('/all/users',requireAdmin, async (req, res) => {
  const conditions=req.query
  try{
    const users= await getUsers({conditions})
    return res.json({users}) 
  } 
  catch(e){
    return res.json({error:e})
  }
})
// update userinfo
router.put('/:id',requireCurrentUser , async (req, res) => {
  if(req.body.email){
    return res.json({'error':'you cannot change your email'})
  }
  try{
    const userUpdate= await updateUserInfo({userId:req.params.id, updates:req.body})
    if(!userUpdate){
      return res.json({error:'no user'})
    }
    return res.json({userUpdate}) 
  } 
  catch(e){
    console.log(e)
    return res.json({error:e})
  }
})
//delete user
router.delete('/:id',requireCurrentUser, async (req, res) => {
  try{
    const deleted= await deleteUser(req.params.id)
    return res.json({deleted})
  } 
  catch(e){
    return res.json({error:e})
  }
})
module.exports=router