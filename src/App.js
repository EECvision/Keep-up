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
       let duePeriod = dateDiff(userDueDate(task.time),currentTimeZone(new Date()),task.date)
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
    key={task.id}
    id={task.id}
    name={task.name}
    time={task.time}
    date={task.date}
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

function userDueDate(userTime){
  userTime=userTime.split(':');
  let [hour,minute,second] = userTime
  hour = parseInt(hour);
  minute = parseInt(minute);
  second = parseInt(second);
  return [hour,minute,second]
}

function currentTimeZone(currentZone){
  let currentTime = currentZone.toTimeString().split(':').join(' ').split(' ')
  let [hour,minute,second] = currentTime;
  hour = parseInt(hour);
  minute = parseInt(minute)
  second = parseInt(second)
  return [hour,minute,second]
}


function dateDiff(userInput,currentInput,userDate){
  let user = userDate.split('-');
  let date = new Date();
  let current = date.toLocaleDateString();
  let [y,m,d] = user;
  user = [m,d,y];
  user=user.join('/');
  let date1 = new Date(current); 
  let date2 = new Date(user) 
  let Difference_In_Time = date2.getTime() - date1.getTime(); 
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  let currentInputInSec = ((currentInput[0]*3600)+(currentInput[1]*60)+(currentInput[2]))
  let userInputInSec = 
      userInput[0] >= currentInput[0] ? 
      ((userInput[0]*3600)+(userInput[1]*60)+(userInput[2])) :
      (((userInput[0]+24)*3600)+(userInput[1]*60)+(userInput[1]));
  let currentTimeInSec = userInputInSec-currentInputInSec;
  let hr = Math.trunc(currentTimeInSec / 3660);
  let min = Math.trunc((currentTimeInSec%3600)/60);
  let sec = (currentTimeInSec%3600)%60;
  if (hr > 24){
      Difference_In_Days -=1;
  }
  return [Difference_In_Days,hr,min,sec];
}




// ----------------------------------------------------------------------
