const mongoose = require('mongoose') , { Schema } = mongoose , 

productSchema = new Schema({
    productname : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image:{
        type: String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    weight : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('product',productSchema);