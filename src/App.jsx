import { useEffect, useState } from 'react';
import './App.css'
import Task from "./Task";
import TaskForm from "./TaskForm";


function App() {

  const [task,setTaskName] = useState([]);
 
  useEffect( ()=>{
    if(task.length === 0) return;
    localStorage.setItem('task',JSON.stringify(task));
  },[task]);
  
  useEffect(()=>{
     const task = JSON.parse(localStorage.getItem('task'))
     setTaskName(task || [])
  },[])

  function addTask(name){
    setTaskName(prev =>{
      return [...prev,{name:name,done:false}]
    })
  }

  function updateTaskDone(taskIndex,newDone){
     setTaskName(prev =>{
        const newTasks  =[...prev];
        newTasks[taskIndex].done = newDone;
        return newTasks;
     })
  }

  function removeTask(indexToRemove ){

    setTaskName(prev =>{
       return prev.filter((data,index) => index !== indexToRemove)
    })
  
  }


  const numberComplete = task.filter(t => t.done).length;
  const numberTotal = task.length

  function getMessage(){
     const percentage = numberComplete/numberTotal *100;
     if(percentage == 0){
        return 'Try to do at least one! 🙏'
     }else if( percentage === 100){
       return 'Nice job for today! 😎'
     } else {
       return 'keep it going 💪'
     }

  }

  
  function renameTask( index,newName){
    setTaskName(prev =>{
       const newtask = [...prev];
       newtask[index].name= newName;
       return newtask
    })
  }


  return (
    <main>
       <h1> {numberComplete}/{numberTotal} Complete</h1>
       <h2>{getMessage()}</h2>
       <TaskForm onAdd={addTask} />
       {task.map( (task,index) => (
           <Task  {...task}  key={index}
           onTrash={()=> removeTask(index)}
           onToggle={done => updateTaskDone(index,done) } 
           onRename={(newName)=> renameTask(index,newName)}
           />
           
       ))}

    </main>
  )
}

export default App
