import React from 'react';

export default function Task(props){


    
    const handleClick=()=>{
        props.manageTask(props.id)
    }
    
    return(
        
        <div className="task-list-container">
            
            <div className="event">
                <div className="event-name">{props.name}</div>
                <div className="event-time">
                    <div className="event-item">
                        <div>{props.period[0]}</div>
                        <div>DD</div>
                    </div>
                    <div className="event-item">
                        <div>{props.period[1]}</div>
                        <div>HH</div>
                    </div>
                    <div className="event-item">
                        <div>{props.period[2]}</div>
                        <div>MM</div>
                    </div>
                    <div className="event-item">
                        <div>{props.period[3]}</div>
                        <div>SS</div>
                    </div>
                </div>
            </div>
            <div className="button">
            <button onClick={handleClick}>manage</button>
            </div>
        </div>
    )
}