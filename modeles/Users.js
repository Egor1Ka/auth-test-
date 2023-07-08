const {Schema,model} = require('mongoose');

const User = new Schema({
    password:{type:String,unique:true,require:true},
    login:{type:String,unique:true,require:true},
})


module.exports = model('User',User)