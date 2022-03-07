const jwt= require('jsonwebtoken')
const config=require('../config/config')

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        // throw 'You are not logged in'
        return res.json({error:'You are not logged in'})
    }
    jwt.verify(token, config.secretToken, (err, decodedToken)=>{
        if(err){
            // throw 'You are not logged in'
            return res.json({error:'You are not logged in'})
        }
        console.log(decodedToken)
        return next()
    })
}
const requireAdmin=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        throw 'You are not logged in'
        // return res.json({error:'You are not logged in'})
    }
    jwt.verify(token, config.secretToken, (err, decodedToken)=>{
        if(err){
            // throw 'You are not logged in'
            return res.json({error:'You are not logged in'})
        }
        console.log(decodedToken)
        if(!decodedToken.isAdmin){
            // throw 'You are forbidden'
            return res.status(403).json({error:'You are forbidden'})
        }
        return next()
    })
}
const requireCurrentUser=(req, res, next)=>{
    const token=req.cookies.jwt;
    if(!token){
        // throw 'You are not logged in'
        return res.json({error:'You are not logged in'})
    }
    jwt.verify(token, config.secretToken, (err, decodedToken)=>{
        if(err){
            // throw 'You are not logged in'
            return res.json({error:'You are not logged in'})
        }
        console.log(decodedToken)
        const userId= req.params.id || req.body.orderedUser
        if(decodedToken.id!=userId){
            // throw 'You are forbidden'
            return res.status(403).json({error:'You are forbidden'})
        }
        return next()
    })
}
const guestOnly=(req,res,next)=>{
    const token=req.cookies.jwt;
    if (token){
        return res.json({'message':'you are already logged in'})
    }
    return next()
}
module.exports= {requireAuth, requireAdmin, requireCurrentUser, guestOnly}
