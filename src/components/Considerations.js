import React from 'react'
import { considerations } from '../reducers/taskReducer'
import './Considerations.css'

const Considerations = () => {
    return (
        <div className="considerations-container">
            <h2>Tasks to Consider</h2>
            <p>If you need help coming up with ideas, click on a topic to get an idea for a task to add to your schedule.</p>
        </div>
    )
}

export default Considerations
