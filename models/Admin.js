const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    privileges:{type:[String],required:true}
})

module.exports = mongoose.model('Admin',userSchema);