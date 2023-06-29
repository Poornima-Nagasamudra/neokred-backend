const mongoose = require('mongoose')
const isEmail  = require('validator/lib/isEmail')
const uniqueValidator = require("mongoose-unique-validator")
const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        minlength: 4,
        maxlength: 50
    },
    email:{
        type: String,
        required:[true, 'email is required'],
        // unique: true,
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message: function(){
                return 'invalid email'
            }
        }
    },
    password: {
        type: String,
        required: [true, 'required password'],
        // unique: true,
        minlength: 8,
        maxlength: 128,
        validate: {
            validator: function (value) {
              return passwordFormat.test(value);
            },
            message: function () {
              return "Password must Contain Minimum 8 characters, at least 1 letter, 1 number and one special character";
            },
          },
    },
    // confirmpassword: {
    //     type: String,
    //     required: [true, 'required password'],
    //     // unique: true,
    //     minlength: 8,
    //     maxlength: 128,
    //     validate: {
    //         validator: function (value) {
    //           return passwordFormat.test(value);
    //         },
    //         message: function () {
    //           return "Password must Contain Minimum 8 characters, at least 1 letter, 1 number and one special character";
    //         },
    //       },
    // },
    dateofbirth:{
        type: String,
       required:[true, 'must be validate']
    },
    phonenumber: {
        type: Number,
        required: [true, 'valid phone number'],
        maxlength: 10
    },
    address: {
        type: String,
        required: true,
        maxlength: 100
    },
    city: {
        type: String,
        required:[true, 'alphabetics characters only'],
        maxlength: 50
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength:6
    },
    country: {
        type: String,
        required: true
    }, 
    securityquestion: {
        type: String,
        required: true 
    },
    securityanswer: {
        type: String,
        required: true,
        maxlength: 100
    } 
}, {timestamps:true})

//userSchema.plugin(uniqueValidator)

userSchema.pre("save", function (next) {
    const user = this
    bcryptjs.genSalt()
      .then((salt) => {
        console.log(salt)
         bcryptjs.hash(user.password, salt)
           .then((encrypted) => {
               user.password = encrypted
               next()
            })
       })
})

// userSchema.pre("save", function (next) {
//     const user = this
//     bcryptjs.genSalt()
//       .then((salt) => {
//         console.log(salt)
//          bcryptjs.hash(user.confirmpassword, salt)
//            .then((encrypted) => {
//                user.confirmpassword = encrypted
//                next()
//             })
//        })
// })

const User = mongoose.model('User', userSchema)

module.exports = User