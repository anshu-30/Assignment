const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
    firstname: {type:String , required:true},
    lastname: {type:String , required:true },
    email: {type:String , required:true , unique:true},
    password: {type:String , required:true},
    date: {type:Date , required:true},
    phone: {type:Number , required:true},
    quote: {type:Array}
    },
    {collection: 'user-data'}
)

const model = mongoose.model('UserData',User)
module.exports = model