import React from 'react'
import Moment from 'react-moment'
import { toggleCompletion } from '../actions/taskActions'
import { connect } from 'react-redux'
import './Task.css'

const Task = props => {
    return (
        <div className={props.task.completed ? "task-container finished" : "task-container"}>
            <div className="task">
                <div className={props.task.completed ? "checkbox completed" : "checkbox"} onClick={() => props.toggleCompletion(props.tasks, props.task.id)}>
                <div className={props.task.completed ? "checkmark" : "checkmark hidden"}>{props.task.completed && <i className="fas fa-check"></i>}</div>
                </div>
                <div>{props.task.name}</div>
            </div>
            <div className="tags" style={(props.task.tags[0].length > 0) ? {display:"flex"} : {display:"none"}}>
                {props.task.tags.map((tag, index) => <div key={`task-${props.task.id}-tag-${index}`} className={(props.activeTab === tag) ? "tag active-tag" : "tag"} onClick={() => props.toggleTag(tag)}>{tag}</div>)}
            </div>
            <div className="date"><Moment format="MMM Do, YYYY" date={props.task.due}/></div>
        </div>
    )
}

const mapStateToProps = state => {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps, { toggleCompletion })(Task)
