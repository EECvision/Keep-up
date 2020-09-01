import React from 'react';

export default function Task(props){
    const handleClick=()=>{
        props.manageTask(props.id)
    }
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
                <>{props.date}{props.time}</>
            </div>
            <div className="button">
            <button onClick={handleClick}>manage</button>
            </div>
        </div>
    )
}