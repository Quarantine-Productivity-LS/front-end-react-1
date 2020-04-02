import React, { useState } from 'react'
import { editTask } from '../actions/taskActions'
import { connect } from 'react-redux'
import moment from 'moment'
import Moment from 'react-moment'
import './LoggedTask.css'

const LoggedTask = props => {
    const [completed, setCompleted] = useState(props.task.completed);

    const handleCheck = event => {
        event.stopPropagation();
        setCompleted(!completed);
        setTimeout(() => {
            props.editTask(props.tasks, {
                ...props.task,
                completed: !props.task.completed
            })
        }, 1000)
    }
    return (
        <div className="logged-task">
            <div className="task">
                <div className={completed ? "checkbox completed" : "checkbox"} onClick={handleCheck}>
                    <div className={completed ? "checkmark" : "checkmark hidden"}>{completed && <i className="fas fa-check"></i>}</div>
                </div>
                <div>{props.task.taskName}</div>
            </div>
            <div>{(props.task.duration) ? `${props.task.duration} minutes` : " "}</div>
            <div>{(props.task.due) ? <Moment date={moment(props.task.due)} format="MMM Do, YYYY"/> : " "}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, { editTask })(LoggedTask)
