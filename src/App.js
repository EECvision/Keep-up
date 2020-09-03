import React,{useState,useEffect} from 'react';
import Form from './components/Form.js'
import Task from './components/Task.js'

export default function App(){

  const [renderForm,setRenderForm] = useState(false);
  const [formStatus,setFormStatus] = useState(true);
  const [tasks,setTasks] = useState([]);
  const [time,setTime] = useState('');
  const [date,setDate] = useState('');
  const [name,setName] = useState('');
  const [id,setId] = useState(Date.now());



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
      time:time,
      period:[]
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
    setRenderForm(true)
    setFormStatus(false)
  }

  useEffect(()=>{
    const id = setInterval(() => {
      const updatedTasks = tasks.map(task=>{
        let duePeriod = dateDiff(userDate(task.date,task.time),currentDate());
       task = {...task,period:duePeriod}
       return task;
      })
      
      setTasks(updatedTasks)
    }, 1000);
    return ()=> clearInterval(id);
  })


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
    id = {task.id}
    key={task.id}
    name={task.name}
    period={task.period}
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


// ----------------------------------------------------------------------

function userDate(date,time){
  let fullDate = [date,time]
                .join(' ').split('-')
                .join(' ').split(':')
                .join(' ').split(' ');
  return new Date(...fullDate)
}

function currentDate(){
  return new Date();
}

function dateDiff(userDate,currentDate){
  let timeDiff = userDate.getTime() - currentDate.getTime(); 
  let days = Math.trunc((timeDiff / 86400000)-30);
  let hours = Math.trunc((timeDiff % 86400000) /  3600000);
  let mins = Math.trunc(((timeDiff % 86400000) % 3600000) / 60000);
  let secs = Math.trunc((((timeDiff % 86400000) % 3600000) % 60000) / 1000);

  return [days, hours, mins, secs];
}






// ----------------------------------------------------------------------
