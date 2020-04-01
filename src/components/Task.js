import React, { useState } from 'react'
import Moment from 'react-moment'
import { toggleCompletion, deleteTask } from '../actions/taskActions'
import { connect } from 'react-redux'
import { Button, Spinner } from 'reactstrap'
import './Task.css'

const Task = props => {
    const [expanded, setExpanded] = useState(false);
    const handleCheck = event => {
        event.stopPropagation();
        props.toggleCompletion(props.tasks, props.task.id);
    }
    const handleDelete = event => {
        event.stopPropagation();
        props.deleteTask(props.tasks, props.task.id);
    }
    const handleExpansion = event => {
        if (props.formClosed === false) {
            props.setFormClosed(true);
        }
        setExpanded(!expanded);
    }
    return (
        <div className={expanded ? "task-container expanded" : "task-container"} onClick={handleExpansion}>
            <div className={props.task.completed ? "shown-info finished" : "shown-info"}>
                <div className="task">
                    <div className={props.task.completed ? "checkbox completed" : "checkbox"} onClick={handleCheck}>
                    <div className={props.task.completed ? "checkmark" : "checkmark hidden"}>{props.task.completed && <i className="fas fa-check"></i>}</div>
                    </div>
                    <div>{props.task.taskName}</div>
                </div>
                <div className="tags" style={(props.task.tags.length > 0) ? {display:"flex"} : {display:"none"}}>
                    {props.task.tags.split(",").map((tag, index) => <div key={`task-${props.task.id}-tag-${index}`} className={(props.activeTab === tag) ? "tag active-tag" : "tag"} onClick={event => {
                        event.stopPropagation();
                        props.toggleTag(tag);
                    }}>{tag}</div>)}
                </div>
                <div className="date">{(props.task.due === undefined) ? <div>${" "}</div> : <Moment format="MMM Do, YYYY" date={props.task.due}/>}</div>
            </div>
            <div className="hidden-info">
                {props.task.description}
                <div>
                    {props.isDeleting ? 
                    <Spinner size="sm" color="danger" /> : 
                    <Button onClick={handleDelete} size="sm" color="danger">Delete</Button>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        isDeleting: state.data.isDeleting
    }
}

export default connect(mapStateToProps, { toggleCompletion, deleteTask })(Task)
