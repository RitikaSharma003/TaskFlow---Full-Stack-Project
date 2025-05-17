 const mongoose=require("mongoose");
 const Schema=mongoose.Schema;

 const taskSchema=new Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
enum:["Low","Medium","High"],
default:"low",

    },  status:{ type:String,
        required:true,
enum:["YetToStart","InProgress","Completed"],
default:"YetToStart",

    },
    
    
 });

 module.exports=mongoose.model("Task",taskSchema);
 