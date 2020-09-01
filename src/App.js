import React,{useState} from 'react';
import Form from './components/Form.js'
import Task from './components/Task.js'



export default function App(){

  const [renderForm,setRenderForm] = useState(false);
  const [formStatus,setFormStatus] = useState(true);
  const [tasks,setTasks] = useState([]);
  const [time,setTime] = useState('time');
  const [date,setDate] = useState('date');
  const [name,setName] = useState('name');
  const [id,setId] = useState(Date.now())

  const showForm=()=>{
    setRenderForm(true)
    setFormStatus(true)
  }

  const set_name=(e)=>{
    setName(e)
  }

  const set_time=(e)=>{
    setTime(e)
  }

  const set_date=(e)=>{
    setDate(e)
  }

  const saveTask=(id,name,time,date)=>{
    const newTask = {
      id:id,
      name:name,
      date:date,
      time:time
    }

    if(formStatus){
      setTasks([...tasks,newTask])
    } else{
        const managedTask = tasks.map(task=>{
          if(task.id===id){
            task =  {...task,...newTask}
          }
          return task
        })
        setTasks(managedTask)
      }
    setRenderForm(false)
    setFormStatus(true)
    setDate('')
    setName('')
    setTime('')
    setId(Date.now())
  }

  const cancelTask=()=>{
    setRenderForm(false)
  }

  const deleteTask=(id)=>{
    const remainingTasks = tasks.filter(task=>task.id !== id )
    setTasks(remainingTasks);
    setRenderForm(false)
    setDate('')
    setName('')
    setTime('')
  }

  const manageTask=(id)=>{
    tasks.map(task=>{
      if(task.id===id){
        setDate(task.date)
        setName(task.name)
        setTime(task.time)
        setId(task.id)
      }return null;
    })
    // alert(id)
    setRenderForm(true)
    setFormStatus(false)
  }

  let form = renderForm
  ?
  <Form 
    status={formStatus} 
    cancelTask={cancelTask} 
    saveTask={saveTask}
    deleteTask={deleteTask}
    id={id}
    time={time}
    date={date}
    name={name}
    setName={set_name}
    setTime={set_time}
    setDate={set_date}
  />
  :
  null;

  const taskList= tasks.map((task)=>(
    <Task
    key={task.id}
    id={task.id}
    name={task.name}
    time={task.time}
    date={task.date}
    manageTask={manageTask}
    />
  ));


  return(
    <div className="task-container">
      <div className="task-name">
        Task Manager
      </div>
      <div className="task-button">
        <button
         type="button"
         onClick={showForm}>Add Task <span>-:-</span></button>
      </div>
      <div>
        {form}
      </div>
      {taskList}
    </div>
  )
}