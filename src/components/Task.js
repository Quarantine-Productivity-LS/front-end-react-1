import React from 'react'
import './Task.css'

const Task = props => {
    return (
        <div className="task-container">
            <div>{props.task.name}</div>
        </div>
    )
}

export default Task
