
import React,{useState} from 'react'
import axios from 'axios';
import { useEffect } from 'react';
const EditTask = ({setEditTaskDiv,EditTaskId}) => {
    const[Values,setValues]=useState({title:"",description:"",priority:"Low", status:"YetToStart"});
    
    
    const change=(e)=>{
      const{name,value}=e.target;
      setValues({...Values,[name]:value});
    };

useEffect(() => {
        const fetch = async () => {
            try {
                console.log(`Fetching task with ID: ${EditTaskId}`);  //debugging
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/v1/getTask/${EditTaskId}`, {
                    withCredentials: true
                });
                console.log("Fetched Task Data:", res.data);
                if (res.data && res.data.taskDetails) {
                    setValues(res.data.taskDetails);
                } else {
                    console.error("Error: Task details not found in response");
                    //  setValues({ title: "", description: "", priority: "Low", status: "YetToStart" }); //removed this, no need to reset
                }
            } catch (error) {
                console.error("Error fetching task:", error);
                //  setValues({ title: "", description: "", priority: "Low", status: "YetToStart" });  //removed this, no need to reset
            }
        };

        if (EditTaskId) {
            fetch();
        }

    }, [EditTaskId]);


    const editTask = async (e, id) => {
        e.preventDefault();
         console.log("Values being sent to editTask:", Values);
        try {
            const res = await axios.put(`http://localhost:1000/api/v1/editTask/${id}`, Values, {

                withCredentials: true
            })

            alert(res.data.success);
            window.sessionStorage.clear("editTaskId");

            setEditTaskDiv("hidden");
            window.location.reload();

        }


        catch (error) {
            alert(error.response.data.error);
            console.log(error);

        }
    };




    const deleteTask = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:1000/api/v1/deleteTask/${id}`, {

                withCredentials: true
            })

            alert(res.data.success);
            window.sessionStorage.clear("editTaskId");

            setEditTaskDiv("hidden");
            window.location.reload();

        }


        catch (error) {
            alert(error.response.data.error);
            console.log(error);

        }
    };


  return (
     <div className="bg-white rounded px-4 py-4 w-[70%] md:w-[40%]">
        <h1 className="text-center font-semibold text-xl">Edit Task</h1>
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

<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
  <button className="w-full sm:w-auto rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-800 transition-all duration-300 text-white-rounded" onClick={(e)=>editTask(e,Values._id)}>Edit Task{" "}</button>
<button className="sm:w-auto w-full px-4 rounded-md border border-red-500  text-red-600 py-2 hover:bg-red-200 transition-all duration-300 text-white-rounded" onClick={(e)=>deleteTask(e,Values._id)
  }>Delete Task</button>



    <button className="sm:w-auto w-full rounded-md border border-black py-2 px-4 hover:bg-zinc-200 transition-all duration-300 text-white-rounded" onClick={(event)=>
  {     event.preventDefault();
    window.sessionStorage.clear("editTaskId")
    setEditTaskDiv("hidden")}}>Cancel</button>
</div>
</form>
        </div>
  )
}

export default EditTask