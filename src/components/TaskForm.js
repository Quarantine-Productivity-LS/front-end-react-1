import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actions/taskActions'
import { Button, Spinner } from 'reactstrap'
import './TaskForm.css'

const TaskForm = props => {
    const [formClosed, setFormClosed] = useState(true);
    const [failure, setFailure] = useState(false);
    const [values, setValues] = useState({
        taskName: "",
        tags: "",
        due: ""
    })

    useEffect(() => {
        if (props.activeTab !== "all") {
            setValues(values => (
                {
                    ...values,
                    tags: props.activeTab
                }
            ))
        }
        else {
            setValues(values => (
                {
                    ...values,
                    tags: ""
                }
            ));
        }
    }, [props.activeTab])

    const handleChanges = event => {
        event.stopPropagation();
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (values.taskName.length > 0) {
            props.addTask(props.tasks, values);
        }
        else {
            setFailure(true);
            setTimeout(() => {
                setFailure(false);
            }, 2000)
        }
    }

    return (
        <div className="task-form" onClick={() => setFormClosed(!formClosed)}>
            <div className={formClosed ? "plus shown" : "plus hidden"}><i className="fas fa-plus" /></div>
            <form className={formClosed ? "" : "open"} autoComplete="off" onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input" onClick={e => e.stopPropagation()}>
                        <label style={failure ? {color:"red"} : {color:"black"}} htmlFor="name">Task</label>
                        <input type="text" id="name" name="taskName" onChange={handleChanges} value={values.taskName}/>
                    </div>
                    <div className="input" onClick={e => e.stopPropagation()}>
                        <label htmlFor="tags">Tags</label>
                        <input type="text" id="tags" name="tags" onChange={handleChanges} value={values.tags}/>
                    </div>
                    <div className="input" onClick={e => e.stopPropagation()}>
                        <label htmlFor="due">Due by</label>
                        <input type="date" id="due" name="due" onChange={handleChanges} value={values.due}/>
                    </div>
                    <div onClick={e => e.stopPropagation()}>{props.isPosting ? <Spinner color="primary"/> : <Button type="submit" color="primary">Add Task</Button>}</div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        isPosting: state.data.isPosting
    }
}

export default connect(mapStateToProps, { addTask })(TaskForm)