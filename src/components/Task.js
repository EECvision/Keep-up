import React from 'react';

export default function Task(props){


    
    const handleClick=()=>{
        props.manageTask(props.id)
    }
    
    return(
        
        <div className="task-constainer">
            
            <div className="event">
                <div className="event-name">{props.name}</div>
                <div className="event-time">
                    <span className="event-item">
                    <div>{props.period[0]}</div>
                    <div>DD</div>
                    </span>
                    <span className="event-item">
                    <div>{props.period[1]}</div>
                    <div>HH</div>
                    </span>
                    <span className="event-item">
                    <div>{props.period[2]}</div>
                    <div>MM</div>
                    </span>
                    <span className="event-item">
                    <div>{props.period[3]}</div>
                    <div>SS</div>
                    </span>
                </div>
            </div>
            <div className="button">
            <button onClick={handleClick}>manage</button>
            </div>
        </div>
    )
}