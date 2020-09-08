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
                        <div>DAY</div>
                    </div>
                    <div className="event-item">
                        <div>{props.period[1]}</div>
                        <div>HRS</div>
                    </div>
                    <div className="event-item">
                        <div>{props.period[2]}</div>
                        <div>MIN</div>
                    </div>
                    <div className="event-item">
                        <div>{props.period[3]}</div>
                        <div>SEC</div>
                    </div>
                </div>
            </div>
            <div className="button">
            <button onClick={handleClick}>manage</button>
            </div>
        </div>
    )
}