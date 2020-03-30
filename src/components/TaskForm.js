import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actions/taskActions'
import { Button } from 'reactstrap'
import './TaskForm.css'

const TaskForm = props => {
    const [formClosed, setFormClosed] = useState(true);
    const [values, setValues] = useState({
        name: "",
        tags: "",
        due: ""
    })

    const handleChanges = event => {
        event.stopPropagation();
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        props.addTask(props.tasks, values);
    }

    return (
        <div className="task-form" onClick={() => setFormClosed(!formClosed)}>
            <div className={formClosed ? "plus shown" : "plus hidden"}><i className="fas fa-plus" /></div>
            <form className={formClosed ? "" : "open"} autoComplete="off" onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input" onClick={e => e.stopPropagation()}>
                        <label htmlFor="name">Task</label>
                        <input type="text" id="name" name="name" onChange={handleChanges} value={values.name}/>
                    </div>
                    <div className="input" onClick={e => e.stopPropagation()}>
                        <label htmlFor="tags">Tags</label>
                        <input type="text" id="tags" name="tags" onChange={handleChanges} value={values.tags}/>
                    </div>
                    <div className="input" onClick={e => e.stopPropagation()}>
                        <label htmlFor="due">Due by</label>
                        <input type="date" id="due" name="due" onChange={handleChanges} value={values.due}/>
                    </div>
                    <Button color="primary">Add Task</Button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps, { addTask })(TaskForm)