import React,{useState} from 'react'
import axios from 'axios';
const AddTask = ({setAddTaskDiv}) => {
const[Values,setValues]=useState({title:"",description:"",priority:"Low", status:"YetToStart"});


const change=(e)=>{
  const{name,value}=e.target;
  setValues({...Values,[name]:value});
};

const addTask = async (e)=>{
  e.preventDefault();
  try{
const res = await axios.post("http://localhost:1000/api/v1/addTask",Values,{
  
  withCredentials:true
})
   console.log("Response:", res);
            alert(res.data.success); // show message

            setValues({title:"",description:"",priority:"Low", status:"YetToStart"})
            setAddTaskDiv("hidden");;

    
  }


catch(error){
     alert(error.response.data.error);
console.log(error);

  }
};




  return (

    <div className="bg-white rounded px-4 py-4 w-[70%] md:w-[40%]">
        <h1 className="text-center font-semibold text-xl">Add Task</h1>
        <hr className="mb-4 mt-2"/>
        <form  method='POST' className="flex flex-col gap-4">
           < input type="text" className="border  px-2 py-1 rounded border-zinc-300 outline-none" placeholder="title"
           name="title" value={Values.title} onChange={change}/>
<div className="flex items-center justify-between gap-4">
    <div className="w-full">
<h3 className="mb-2">Select Priority</h3>
<select name="priority" id="" className="border px-2 py-1 rounded border-zinc-300 outline-none w-full" onChange={change}>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>



    </div>


   <div className="w-full">
<h3 className="mb-2">Select Status</h3>
<select name="status" id="" className="border px-2 py-1 rounded border-zinc-300 outline-none w-full" onChange={change}>
  <option value="YetToStart">Yet To Start</option>
  <option value="InProgress">In Progress</option>
  <option value="Completed">Completed</option>
</select>



    </div>





</div>
<textarea className="border  px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"  name="description" id="" placeholder="Description" value={Values.description} onChange={change}></textarea>

<div className="flex items-center justify-between gap-4">
  <button className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-800 transition-all duration-300 text-white-rounded" onClick={addTask}>Add Task{" "}</button>
<button className="w-full rounded-md border border-black py-2 hover:bg-zinc-200 transition-all duration-300 text-white-rounded" onClick={(e)=>
  {     e.preventDefault();
    setAddTaskDiv("hidden")}}>Cancel</button>
</div>
</form>
        </div>
  )
}

export default AddTask;
