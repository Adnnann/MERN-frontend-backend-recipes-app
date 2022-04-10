const mongoose = require('mongoose')
const crypto = require('crypto')
const validate = require('mongoose-validator')

const emailValidate = [
    validate({
        validator:'isEmail',
        message:'Please enter valid email address'
    })
]

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'Name is required',
        trim: true,
        match:[/^[a-zA-Z0-9]+$/, 'Only letters can be used for name']

    },
    email:{
        type:String,
        required:'Email is required',
        trim: true,
        validate:emailValidate
    },
    created: {
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
    },
    updated: Date,
    hashed_password:{
        type:String,
        required: 'Password is required'
    },
    salt:String
})

UserSchema.virtual('password')
.set(function(password){
    this._password = password,
    this.salt = this.makeSalt(),
    this.hashed_password = this.encryptPassword(password)

    console.log(this.hashed_password)

})

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
            
        }catch(err){
            return err
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters')
    }
}, null)

const User = mongoose.model('User', UserSchema)

module.exports = User
