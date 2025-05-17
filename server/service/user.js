const User=require("../models/user");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");



const register=async(req,res)=>{
    try{
        const{username,email,password}=req.body
if(!username||!email||!password)
{
    return res.status(400).json({error:"All fields are required."});

}



if(username.length<5){
    return res.status(400).json({error:"Username must have 5 character"});

}
if(password.length<6)
{
    return res.status(400).json({error:"Password must have 6 characters"});

}




const checkUsers=await User.findOne({$or:[{email},{username}]});
if(checkUsers)
{
    return res.status(400).json({error:"Username and Email already exists."});
}


else{
    const hashPass=await bcrypt.hash(password,10);






    const newUser=new User({username,email,password:hashPass});
    await newUser.save();
    return res.status(200).json({success:"Registration successful."})
}
    }
    catch(error)
    {
return res.status(400).json({error:"Internal server error!"});


    }
    


};

const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        console.log("Attempting to log in with email:", email);
if(!email || !password)
{console.log("Email or password missing."); 
    return res.status(400).json({error:"All fields are required."});

}
const checkUser=await User.findOne({email});
if(checkUser)
{
  console.log("User found:", checkUser);
    bcrypt.compare(password,checkUser.password,(err,data)=>{
        if(data)
        {   console.log("Passwords matched!");
            const token=jwt.sign({id:checkUser.id,email:checkUser.email},process.env.JWT_SECRET,{expiresIn:"30d"});

               console.log("Token generated:", token);
            res.cookie("taskmanagerUserToken",token,{
                httpOnly:true,
                maxAge:30*24*60*60*1000,
                secure:process.env.NODE_ENV==="production",sameSite:"None",

            });
   console.log("Cookie set successfully");
return res.status(200).json({success:"Login Success!"})


        }
        else{ console.log("User not found with email:", email)
            res.status(400).json({error:"Invalid credentials"});

        }
    });

}
    }
    catch(error)
    { console.error("Error during login:", error);
        return res.status(404).json({error:"Internal server error!"});

        
    }
};
const logout=async(req,res)=>{
    try{
        res.clearCookie("taskmanagerUserToken",{
            httpOnly:true,
        });
        res.json({message:"Logged Out"});

    }catch(error)
    {
        return res.status(404).json({error:"Internal server error!"});

    }
};

const userDetails=async(req,res)=>{
    try{

const {user}=req;
const getDetails=await User.findById(user._id).populate("tasks").select("-password");
if(getDetails){
    const allTasks=getDetails.tasks;
    let YetToStart=[];
    let InProgress=[];
    let Completed=[];
    allTasks.map((item)=>{
       if(item.status==="YetToStart")
        {
            YetToStart.push(item);

        } else if (item.status==="InProgress")
        {
            InProgress.push(item);

        }
        else{
  Completed.push(item);
        }
      


    })


    return res.status(200).json({success:"success",tasks:[{YetToStart},{InProgress},{Completed}]});

}



    }catch(error){
        return res.status(404).json({error:"Internal server error!"});
    }
}






module.exports={register,login,logout,userDetails};
