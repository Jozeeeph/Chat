const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username : {type:String, required:true},
    email : {type:String , required:true},
    password : {type:String, required:true},
    role : {type:String, required:true},
    status : {type:Boolean},
    banned :{type:Boolean,default:false}
})

module.exports = mongoose.model('User',userSchema);