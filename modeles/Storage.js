const {Schema,model} = require('mongoose');

const Storage = Schema({
    title:{type:String,require:true,unique:true},
    users:{type:Array,require:true,unique:false},
    components:{type:Object,require:false,unique:false}
})

module.exports = model("Storage",Storage)