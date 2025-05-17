const task = require("../models/task.js");
const addTask = async (req, res) => {
    try {
        console.log("addTask function called");
        console.log("Request body:", req.body);
        const { title, description, priority, status } = req.body;
        const { user } = req;
        console.log("User:", user);

        if (!title || !description) {
            console.log("Title or description missing");
            return res.status(400).json({ error: "All field are required." });
        }
        if (title.length < 5) {
            console.log("Title too short");
            return res.status(404).json({ error: "Title must have 5 characters" });
        }
        if (description.length < 5) {
            console.log("Description too short");
            return res.status(404).json({ error: "Description must have 5 characters" });
        }
        const newTask = new task({ title, description, priority, status });
        console.log("newTask object:", newTask);
        try {
             await newTask.save();
             console.log("newTask saved:", newTask);
        } catch(saveError){
            console.error("Error saving newTask",saveError);
            return res.status(500).json({error:"Error saving task"})
        }

       
        user.tasks.push(newTask._id);
        await user.save();
        console.log("User updated:", user);
        return res.status(200).json({ success: "Task added" });
    } catch (error) {
        console.error("Error in addTask:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



//edit task
const editTask=async(req,res)=>{
    try{
        const {id}=req.params;

const{title,description,priority,status}=req.body;
// const {user}=req.user;
if(!title||!description)
{
    return res.status(400).json({error:"All field are required."})
}
if(title.length<5)
{
    return res.status(404).json({error:"Title must have 5 characters"});

}
if(description.length<5)
{
      return res.status(404).json({error:"Description must have 5 characters"});

}
        const updatedTask = await task.findByIdAndUpdate(id, { title, description, priority, status }, { new: true }); //added new true

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" }); // Handle the case where the task with the ID doesn't exist
        }
        return res.status(200).json({ success: "Task updated", updatedTask }); // Include updatedTask in the response

    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: "Internal server error" }); // Changed to 500
    }

};

//gettask
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        // Assuming 'task' is your Mongoose model
        const taskDetails = await task.findById(id);

        if (!taskDetails) {
            // Handle the case where the task with the given ID is not found.
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ taskDetails });

    } catch (error) {
        console.error("Error in getTask:", error); // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" }); // Use 500 for server errors
    }
};


// deleteTask
const deleteTask=async(req,res)=>{
    try{
        const{id}=req.params;
        
await task.findByIdAndDelete(id);


return res.status(200).json({success:"Task deleted"});

    }
    catch(error)
    {
        return res.status(404).json({error:"Internal server error"});

    }
    
};
module.exports={
    addTask,editTask,getTask,deleteTask
}