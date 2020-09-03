import React from 'react';

export default function Task(props){


    
    const handleClick=()=>{
        props.manageTask(props.id)
    }

    // function userDueDate(userTime){
    //     userTime=userTime.split(':');
    //     let [hour,minute,second=0] = userTime
    //     hour = parseInt(hour);
    //     minute = parseInt(minute)
    //     // console.log([hour,minute,second]);
    //     return [hour,minute,second]
    // }

    // function currentTimeZone(currentZone){
    //     let currentTime = currentZone.toTimeString().split(':').join(' ').split(' ')
    //     let [hour,minute,second] = currentTime;
    //     hour = parseInt(hour);
    //     minute = parseInt(minute)
    //     second = parseInt(second)
    //     // console.log([hour,minute,second]);
    //     return [hour,minute,second]
    // }


    // function dateDiff(userInput,currentInput){
    //     let user = props.date.split('-');
    //     let date = new Date();
    //     let current = date.toLocaleDateString();
    //     let [y,m,d] = user;
    //     user = [m,d,y];
    //     user=user.join('/');
    //     let date1 = new Date(current); 
    //     let date2 = new Date(user) 
    //     let Difference_In_Time = date2.getTime() - date1.getTime(); 
    //     let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    //     let currentInputInMin = (currentInput[0]*60)+(currentInput[1])
    //     let userInputInMin = 
    //         userInput[0] >= currentInput[0] ? 
    //         (userInput[0]*60)+(userInput[1]) :
    //         ((userInput[0]+24)*60)+(userInput[1]);
    //     let currentTimeInMin = userInputInMin-currentInputInMin;
    //     let hr = Math.round(currentTimeInMin / 60);
    //     let min = currentTimeInMin % 60;
    //     let sec = currentInput[2];
    //     if (hr > 12){
    //         Difference_In_Days -=1;
    //     }
    //     console.log([Difference_In_Days,hr,min,sec]);
    //     return [Difference_In_Days,hr,min,sec]
    // }

    //  let current = currentTimeZone(new Date()); 
    //  let user = userDueDate(props.time)

    
    
     
    return(
        <div className="task-constainer">
            <div className="event">
                <label>
                    Name
                </label>
                <>{props.name}</>
                <label>
                    Remaining
                </label>
                <>{props.period}</>
            </div>
            <div className="button">
            <button onClick={handleClick}>manage</button>
            </div>
        </div>
    )
}