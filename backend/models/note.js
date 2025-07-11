const mongoose=require("mongoose");
const user = require("./user");

const userschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
        
    },
    note:{
        type:String,
        required:true
        
    },
    subject:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    }
},
    {timestamps:true},
)
module.exports = mongoose.model("Note",userschema);