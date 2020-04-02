import React from 'react'
import Task from './Task'
import './Logbook.css'

const Logbook = () => {
    return (
        <div className="logbook-container">
            <h2>You've completed <span>{0} hours</span> of productivity</h2>
        </div>
    )
}

export default Logbook
