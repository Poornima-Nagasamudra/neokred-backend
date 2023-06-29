const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const userController = {}

userController.register = (req, res) => {
    const body = req.body 
    console.log(body)
    const user = new User(body)
    user.save()
       .then((user)=> {
           res.json(user)
       })
       .catch((err)=> {
          res.json(err)
       })
  
}

userController.login = (req,res) => {
    const body = req.body
    console.log(body)
    User.findOne ({ email : body.email})
       .then((user)=> {
        console.log(user)
           if(!user){
               res.json({errors: 'invalid email or password'})
           } else {
              bcryptjs.compare(body.password, user.password)
                 .then((match)=> {
                    console.log('match', match)
                      if(match){
                          const tokenData = {
                             _id: user._id,
                             username: user.username,
                             email: user.email,
                          }
                          const token = jwt.sign(tokenData,  'dct@123', {expiresIn : '5m' })
                         console.log(token)
                          res.json({ token : `Bearer ${token}`})
                      } else {
                         res.json({ errors: 'invalid email or password'})
                      }
                 })
           }
           
       })
}

userController.account = (req, res) => {
    res.json(req.user)   
}

// userController.list = (req, res) => {
//     console.log(req.user)
//     User.find()
//       .then ((users) => {
//          res.json(users)
//       })
//       .catch((err)=>{
//           res.json(err)
//       })
// }


module.exports = userController