import { useState } from "react";

function TaskForm( {onAdd} ) {
  const [taskName, setTaskName] = useState('');

  function handleSubmit(ev){
     ev.preventDefault();
     onAdd(taskName)
     setTaskName('')
  }

  return (
    <form onSubmit={handleSubmit}> 
      <button>+</button>
      <input
        type="text"
        value={taskName}
        name="taskInput"
        id=""
        placeholder="Your next task.."
        onChange={ev => setTaskName(ev.target.value) }
      />
    </form>
  );
}

export default TaskForm;
