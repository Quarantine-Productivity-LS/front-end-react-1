import React from 'react'
import { toggleCompletion } from '../actions/taskActions'
import { connect } from 'react-redux'
import './Task.css'

const Task = props => {
    return (
        <div className="task-container">
            <div className="task">
                <div className={props.task.completed ? "checkbox completed" : "checkbox"} onClick={() => props.toggleCompletion(props.tasks, props.task.id)}>
                <div className={props.task.completed ? "checkmark" : "checkmark hidden"}>{props.task.completed && <i className="fas fa-check"></i>}</div>
                </div>
                <div>{props.task.name}</div>
            </div>
            <div className="tags">
                {props.task.tags.map(tag => <div className="tag" onClick={() => props.toggleTag(tag)}>{tag}</div>)}
            </div>
            <div className="date">
                date
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps, { toggleCompletion })(Task)
