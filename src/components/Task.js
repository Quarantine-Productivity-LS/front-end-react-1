import React, { useState } from 'react'
import { toggleCompletion, deleteTask, editTask } from '../actions/taskActions'
import { connect } from 'react-redux'
import { Button, Spinner } from 'reactstrap'
import './Task.css'

const Task = props => {
    const [expanded, setExpanded] = useState(false);
    const [editing, setEditing] = useState(false);
    const [values, setValues] = useState({
        id: props.task.id,
        taskName: props.task.taskName,
        description: props.task.description,
        tags: props.task.tags,
        due: props.task.due,
        duration: props.task.duration,
    })
    const handleChanges = event => {
        event.stopPropagation();
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }
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
        setEditing(false);
        setExpanded(!expanded);
    }
    const handleEdit = event => {
        event.stopPropagation();
        setEditing(!editing);
    }
    const handleSave = event => {
        event.stopPropagation();
        props.editTask(props.tasks, values);
        setEditing(false);
    }
    return (
        <div className={expanded ? "task-container expanded" : "task-container"} onClick={handleExpansion}>
            <div className={props.task.completed ? "shown-info finished" : "shown-info"}>
                <div className="task">
                    <div className={props.task.completed ? "checkbox completed" : "checkbox"} onClick={handleCheck}>
                    <div className={props.task.completed ? "checkmark" : "checkmark hidden"}>{props.task.completed && <i className="fas fa-check"></i>}</div>
                    </div>
                    {!editing ? <div>{props.task.taskName}</div> : 
                    <input type="text" id="taskName" name="taskName" value={values.taskName} onClick={e => e.stopPropagation()} onChange={handleChanges} />}
                </div>
                {!editing ? <div className="tags" style={(props.task.tags.length > 0) ? {display:"flex"} : {display:"none"}}>
                    {props.task.tags.split(",").map((tag, index) => <div key={`task-${props.task.id}-tag-${index}`} className={(props.activeTab === tag) ? "tag active-tag" : "tag"} onClick={event => {
                        event.stopPropagation();
                        props.toggleTag(tag);
                    }}>{tag}</div>)}
                </div> :
                <input type="text" id="tags" name="tags" value={values.tags} onClick={e => e.stopPropagation()} onChange={handleChanges} />}
                {!editing ? <div className="duration">{(props.task.duration) ? `${props.task.duration} minutes` : " "}</div> : 
                <input type="text" id="duration" name="duration" value={values.duration} onClick={e => e.stopPropagation()} onChange={handleChanges} />}
            </div>
            <div className="hidden-info" style={props.task.description.length > 0 ? {justifyContent: "space-between"} : {justifyContent: "center"}}>
                {!editing ? `${props.task.description}` : 
                <input type="text" id="description" name="description" value={values.description} onClick={e => e.stopPropagation()} onChange={handleChanges} />}
                <div>
                    {props.isDeleting ? 
                    <Spinner size="sm" color="danger" /> : 
                    <div>
                        <Button onClick={handleDelete} color="danger">Delete</Button>
                        {!editing ? <Button onClick={handleEdit} color="danger">Edit</Button> : <Button onClick={handleSave} color="danger">Save</Button>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        isDeleting: state.data.isDeleting,
        isEditing: state.data.isEditing
    }
}

export default connect(mapStateToProps, { toggleCompletion, deleteTask, editTask })(Task)
