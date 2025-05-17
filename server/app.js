const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser");

require("dotenv").config();
require("./connection/connection");
const userApis=require("./controllers/user");
const taskApis=require("./controllers/task");

const authMiddleware=require("./middleware/authMiddleware")
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174","https://task-flow-full-stack-project.netlify.app"],
    credentials:true,
}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello from backend");

});
app.use("/api/v1",userApis);
app.use("/api/v1",authMiddleware); 
app.use("/api/v1",taskApis);
app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})
app.listen(`${process.env.PORT}`,()=>{
    console.log(`server started at PORT=${process.env.PORT}`);

});
