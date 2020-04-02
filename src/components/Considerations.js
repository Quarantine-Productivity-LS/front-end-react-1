import React, { useState } from 'react'
import { addTask } from '../actions/taskActions'
import { connect } from 'react-redux'
import { considerations } from '../reducers/taskReducer'
import { Button } from 'reactstrap'
import './Considerations.css'

const Considerations = props => {
    const [failure, setFailure] = useState(false);
    const [activeTopic, setTopic] = useState("");
    const [values, setValues] = useState({
        taskName: "",
        description: "",
        tags: "",
        due: "",
        duration: "",
    })

    const updateValues = topic => {
        setTopic(topic);
        setValues({
            ...values,
            taskName: considerations[topic][Math.floor(Math.random()*considerations[topic].length)],
            tags: topic
        })
    }

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (values.taskName.length > 0) {
            props.addTask(props.tasks, values);
            setValues({
                taskName: "",
                description: "",
                tags: "",
                due: "",
            })
            setTopic("");
        }
        else {
            setFailure(true);
            setTimeout(() => {
                setFailure(false);
            }, 2000)
        }
    }
    
    return (
        <div className="considerations-container">
            <h2>Tasks to Consider</h2>
            <p>If you need help coming up with ideas, click on a topic to get an idea for a task to add to your schedule.</p>
            {(!activeTopic.length > 0) && <div className="considerations-topics">
                {Object.keys(considerations).map(topic => <div onClick={() => updateValues(topic)} className="topic">{topic}</div>)}
            </div>}
            {(activeTopic.length > 0) && <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <h3>{activeTopic}</h3>
                    <div className="input">
                    <label style={failure ? {color:"red"} : {color:"black"}} htmlFor="taskName">Task</label>
                        <input type="text" name="taskName" id="taskName" value={values.taskName} onChange={handleChange}/>  
                    </div>
                    <div className="input">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" name="tags" id="tags" value={values.tags} onChange={handleChange}/>  
                    </div>
                    <div className="input">
                        <label htmlFor="duration">Duration</label>
                        <input type="text" name="duration" id="duration" placeholder="minutes" value={values.duration} onChange={handleChange}/>  
                    </div>
                    <div className="input">
                        <label htmlFor="due">Due by</label>
                        <input type="date" name="due" id="due" value={values.due} onChange={handleChange}/>  
                    </div>
                    <div className="input">
                        <label htmlFor="description">Notes</label>
                        <textarea name="description" id="description" value={values.description} onChange={handleChange}/>  
                    </div>
                    <Button type="submit" color="danger">Add Task</Button>
                    <Button type="button" color="danger" onClick={() => updateValues(activeTopic)}>Get Another Consideration</Button>
                    <Button type="button" color="danger" onClick={() => setTopic("")}>Close</Button>
                </div>  
            </form>}
        </div>
    )
}

const mapStateToProps = state => {
    return {tasks: state.tasks}
}

export default connect(mapStateToProps, { addTask })(Considerations)
