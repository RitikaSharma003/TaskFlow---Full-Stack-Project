import React, { useState,useEffect } from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import StackTitle from '../components/Dashboard/StackTitle';
import YetToStart from '../components/Dashboard/YetToStart';
import InProgress from '../components/Dashboard/InProgress';
import Completed from '../components/Dashboard/Completed';
import axios from "axios";
import EditTask from '../components/Dashboard/EditTask';
const Dashboard = () => {
const [AddTaskDiv,setAddTaskDiv]=useState("hidden");
const [Tasks,setTasks]=useState();
const apiUrl = process.env.REACT_APP_SERVER_URL;

const[EditTaskDiv,setEditTaskDiv]=useState("hidden");
const[EditTaskId,setEditTaskId]=useState();

useEffect(()=>{
const fetchUserDetails=async()=>{
  try{
const res=await axios.get(`${apiUrl}/api/v1/userDetails`,{
        withCredentials:true,
      });
      console.log(res.data);


      setTasks(res.data.tasks);
  }
  catch(error)
  {
            console.error("Error fetching user details", error);
  }
};  
fetchUserDetails();

  if(window.sessionStorage.getItem("editTaskId"))
  {setEditTaskDiv("block");
    setEditTaskId(window.sessionStorage.getItem("editTaskId"));


  }
},[AddTaskDiv]);


  return (
    <div className="w-full relative ">
        <div className="bg-blue-200">
            <Header setAddTaskDiv={setAddTaskDiv}/>

        </div>


        <div className="px-4 py-4 md:px-12 md:py-4 flex flex-col md:flex-row gap-8 bg-blue-100 min-h-[89vh] max-h-auto">
<div className="w-full md:w-1/3">
<StackTitle title={"Yet To Start"} />
<div className="pt-2" style={{ border: '1px solid blue', borderRadius: '2px' }}>
{Tasks && <YetToStart task={Tasks[0].YetToStart}/>}
</div>
</div>

<div className="w-full md:w-1/3">
<StackTitle title={"In Progress"} />
<div className="pt-2" style={{ border: '1px solid blue', borderRadius: '2px' }}>
{Tasks && <InProgress task={Tasks[1].InProgress}/>}

</div>
</div>

<div className="w-full md:w-1/3">
<StackTitle title={"Completed"}/>
<div className="pt-2" style={{ border: '1px solid blue', borderRadius: '2px' }}>
{Tasks && <Completed task={Tasks[2].Completed}/>}

</div>

  
  </div>

        </div>

<div className={`w-full ${AddTaskDiv}  h-screen fixed top-0 left-0 bg-zinc-800 opacity-85 flex items-center justify-center z-50`}></div>
<div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center   z-50`}>
<AddTask setAddTaskDiv={setAddTaskDiv}/>
</div>











<div className={`w-full ${EditTaskDiv}  h-screen fixed top-0 left-0 bg-zinc-800 opacity-85 flex items-center justify-center z-50`}></div>
<div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center z-50`}>
<EditTask EditTaskId={EditTaskId} setEditTaskDiv={setEditTaskDiv}/>
</div>
</div>

    
  )
}

export default Dashboard