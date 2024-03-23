const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');


let productSchema = new Schema({
    product:{
        type:String,
        require:[true,"Product name is required field."],
        maxLength:20,
        unique:true,
        trim:true,
        lowercase:true
    },
    cost:{type:Number,require:true},
    description:{type:String,require:true},
    quantity:{type:Number,require:true}
    },
    {
        collection:'products',
        timestamps:true
    }
)

productSchema.plugin(uniqueValidator)


module.exports = mongoose.model('Product',productSchema);