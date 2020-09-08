import React,{useState,useEffect} from 'react';
import Form from './components/Form.js'
import Task from './components/Task.js'
import firebase from 'firebase';

export default function App(){

  const [renderForm,setRenderForm] = useState(false);
  const [formStatus,setFormStatus] = useState(true);
  const [tasks,setTasks] = useState([]);
  const [time,setTime] = useState('');
  const [date,setDate] = useState('');
  const [name,setName] = useState('');
  const [id,setId] = useState(Date.now());

  useEffect(()=>{
    firebase.database().ref('todos').on('value', (snapshot) => {
      const vals = snapshot.val();
      let _records = [];
      for(var key in vals){
          _records.push({
              ...vals[key],
              period:[],
              id:key
          });
      }
      console.log(_records);
      setTasks(_records)
    });
  },[])


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
    if (id && name && time && date){
        const newTask = {
        id:id,
        name:name,
        date:date,
        time:time,
        period:[]
      }

      if(formStatus){
        setTasks([...tasks,newTask])
          firebase.database().ref('todos').push().set({
            ...newTask
          })
      } else{
          const managedTask = tasks.map(task=>{
            if(task.id===id){
              task =  {...task,...newTask}
            }
            return task
          })
          setTasks(managedTask)
            firebase.database().ref(`todos/${id}`).set({
              ...newTask
            })
        }

      setRenderForm(false)
      setFormStatus(true)
      setDate('')
      setName('')
      setTime('')
      setId(Date.now())
    }else{
      cancelTask();
    }
  }

  const cancelTask=()=>{
    setRenderForm(false)
    setDate('')
    setName('')
    setTime('')
    setId(Date.now())
  }

  const deleteTask=(id)=>{
    const remainingTasks = tasks.filter(task=>task.id !== id )
    setTasks(remainingTasks);
    const rootRef = firebase.database().ref().child('todos');
    rootRef.child(id).remove();

    setRenderForm(false)
    setDate('')
    setName('')
    setTime('')
    setId(Date.now())
  }

  const manageTask=(id)=>{
    tasks.map(task=>{
      if(task.id===id){
        task.time = task.time.substring(0,5);
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

  const taskList= tasks.map((task)=>{
    if(task===null){
      return null
    }
    return <Task
    id = {task.id}
    key={task.id}
    name={task.name}
    period={task.period}
    manageTask={manageTask}
    />
  });


  return(
    <div className="task-container">
      <h1 className="task-name">
        KEEP-UP 
      </h1>
      <h3 className="task-button">
        <button
         type="button"
         onClick={showForm}>Add New Task</button>
      </h3>
      <div>
        {form}
      </div>
      {taskList}
    </div>
    
  )
}


function userDate(date,time){
  let fullDate = [date,time]
                .join(' ').split('-')
                .join(' ').split(':')
                .join(' ').split(' ');
    let dateFormat = parseInt(fullDate[1])-1;
    fullDate.splice(1,1,String(dateFormat));
  return new Date(...fullDate)
}

function currentDate(){
  return new Date();
}

function dateDiff(userDate,currentDate){
  let timeDiff = userDate.getTime() - currentDate.getTime(); 
  if(timeDiff < 0){
    return [0,0,0,0];
  }
  let days = Math.trunc((timeDiff / 86400000));
  let hours = Math.trunc((timeDiff % 86400000) /  3600000);
  let mins = Math.trunc(((timeDiff % 86400000) % 3600000) / 60000);
  let secs = Math.trunc((((timeDiff % 86400000) % 3600000) % 60000) / 1000);
    return [days, hours, mins, secs];
}