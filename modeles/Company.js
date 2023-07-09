const {Schema,model} = require('mongoose');

const Company = new Schema({
    type:{type:String,unique:false,require:true},
    title:{type:String,unique:false,require:true},  
    users:{type:Array,require:true},
    storage:{type:Array,require:false}
})


module.exports = model('Company',Company)