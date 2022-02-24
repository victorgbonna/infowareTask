const config=require('./config/config')
const jwt =require('jsonwebtoken')
const express=require('express')
const connectDB=require('./config/db')
const apiRoute= require('./apiRoute')
const { loginContact } = require('./service')
const {successWrapper, errorWrapper } = require('./helper')
const refreshTokens = require('./config/refreshToken')
connectDB()
const app= express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/contact', apiRoute)
app.post('/login', (req, res)=>{
    try {
        const contact= loginContact(req.body.email)
        const accessToken = jwt.sign(
            { id: contact._id },
            config.secretToken,
            { expiresIn: '5h' }
        )
        const refreshToken=jwt.sign({ id: contact._id }, config.secretToken,{ expiresIn: '5h' })
        refreshTokens.addToken(refreshToken, user._id);
        res
            .set('Authorization', accessToken)
            .cookie('refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24 * 14 * 1000,
            httpOnly: true,
            path: '/',
            sameSite: true,
            secure: config.nodeEnv === 'production' ? true : false,
            })
            .json({ contactId: contact._id, accessToken });

    } catch (err) {
        console.log(err)
        return errorWrapper({
            res,
            message: 'Login Failed',
            type: 'Login Failed',
            status:res.statusCode
        })
    }

})
app.listen(config.port,()=>{
    console.log(`Server running in ${config.nodeEnv} on port ${config.port} on db- ${config.mongoUrl}`);
})
module.exports=app
