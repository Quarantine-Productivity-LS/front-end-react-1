import React from 'react'
import { toggleCompletion } from '../actions/taskActions'
import { connect } from 'react-redux'
import './Task.css'

const Task = props => {
    return (
        <div className="task-container">
            <div className="task">
                <div className={props.task.completed ? "checkbox completed" : "checkbox"} onClick={() => props.toggleCompletion(props.tasks, props.task.id)}>
                    {props.task.completed && <i className="fas fa-check"></i>}
                </div>
                <div>{props.task.name}</div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps, { toggleCompletion })(Task)
