const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticateUser = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1]
        try{
            let tokenData = jwt.verify(token, 'dct@123')
            User.findById(tokenData._id)
                .then((user) => {
                console.log('user', user)
                    req.user = user
                    next()
                })
                .catch((err) => {
                    res.json(err)
                }) 
        } catch(e){
            res.status(400).json(e)
       }
}


module.exports =  authenticateUser