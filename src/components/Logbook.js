import React, { useState, useEffect } from 'react'
import { getData } from '../actions/taskActions'
import { connect } from 'react-redux'
import LoggedTask from './LoggedTask'
import './Logbook.css'

const Logbook = props => {
    const { getData } = props;
    const [totalHours, setTotalHours] = useState(0);

    // get data
    useEffect(() => getData(), [getData])

    // get total hours
    useEffect(() => {
        const getTotalHours = () => {
            let minutes = 0;
            props.tasks.forEach(task => {
                if (task.completed) minutes = minutes + task.duration;
            })
            setTotalHours((minutes / 60).toFixed(2));
        }
        getTotalHours();
    }, [props.tasks])

    return (
        <div className="logbook-container">
            <h2>You've been productive for <span>{totalHours} hours</span> while in quarantine</h2>
            <div className="logbook">
                {props.tasks.slice().reverse().map(task => (task.completed && <LoggedTask task={task}/>))}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { getData })(Logbook)
