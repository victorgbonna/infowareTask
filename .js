const express = require('express')
const router = express.Router()

const { successWrapper, errorWrapper } = require('./helper')
const { authenticateToken } = require('./middleware')
const { getContact, getContacts, updateContactInfo, addContact, addContacts, deleteContact } = require('./service')

//add contact
router.post('/add', async (req, res) => {
    try{
      const contact = await addContact(req.body)
      return successWrapper({
        res,
        message: 'Contact created successfully',
        data: {contact}
      })
  
    }catch(err){
        console.log(err)
        // return res.status(422).json(e)
        return errorWrapper({
          res,
          message: err,
          type: 'Validation Errors',
          status:res.statusCode
        }) 
    }
  })
//add bulk contacts
router.post('/bulk/add', authenticateToken, async(req,res)=>{
    try{
        const contacts = await addContacts(req.body)
        return successWrapper({
          res,
          message: 'Contact created successfully',
          data: {contacts}
        })
    }catch(err){
        console.log(err)
        // return res.status(422).json(e)
        return errorWrapper({
        res,
        message: err,
        type: 'Validation Errors',
        status:res.statusCode
        }) 
    }
})
//get contacts with pagination and conditions(example-{'phone': '+234 8072897950', 'birthday-month':3})
router.get('/all',authenticateToken, async(req,res)=>{
    
    const {pageNo, pageSize, ...conditions}=req.query
    const getAllContacts= await getContacts({pageNo, pageSize, conditions})
    return successWrapper({
        res,
        message: 'Contacts gotten successfully',
        data: {getAllContacts}
    })
    
})
//get contact with contact id
router.get('/:contactId', authenticateToken, async(req,res)=>{
    const contactId= req.params.contactId
    try {
        const contact= await getContact(contactId)
        return successWrapper({
            res,
            message: 'Contact gotten successfully',
            data: contact
        })
    } catch (err) {
        console.log(err)
        return errorWrapper({
            res,
            message: err,
            type: 'Mongoose Errors',
            status:res.statusCode
        })
    }
})
//update contact info
router.put('/:contactId',authenticateToken, async (req,res) =>{
    const contactId= req.params.contactId
    const updates=req.body
    // console.log(contactId)
    try {
      const contact= await updateContactInfo({contactId,updates})
      return successWrapper({
          res,
          message: 'Contact updated successfully',
          data: contact
      })
      } catch (err) {
          console.log(err)
          return errorWrapper({
              res,
              message: err,
              type: 'Mongoose Errors',
              status:res.statusCode
          })
      }
})
//delete contact
router.delete('/:contactId',authenticateToken, async (req,res) =>{
  const contactId= req.params.contactId
  // console.log(contactId)
  try {
    const contact= await deleteContact(contactId)
    return successWrapper({
        res,
        message: 'Contact deleted successfully',
        data: contact
    })
    } catch (err) {
        console.log(err)
        return errorWrapper({
            res,
            message: err,
            type: 'Mongoose Errors',
            status:res.statusCode
        })
    }
})
module.exports = router
