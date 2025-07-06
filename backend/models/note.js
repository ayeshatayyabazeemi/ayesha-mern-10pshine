const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
        
    },
    note:{
        type:String,
        required:true
        
    },
    date:{
        type:Date,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    timestamps:true,
})
module.export = mongoose.Schema(note,userschema);