const mongoose = require("mongoose");

const specialSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },

    // products: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Product"
    //      }
    // ]
       
    
        
     
},
{timestamps:true})


module.exports = mongoose.model("Special", specialSchema);
