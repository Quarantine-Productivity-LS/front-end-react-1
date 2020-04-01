import React, { useState, useEffect } from 'react'
import Task from './Task'
import Date from './Date'
import TaskForm from './TaskForm'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane, Spinner } from 'reactstrap'
import classnames from 'classnames'
import { getData } from '../actions/taskActions'
import './TaskList.css'

const TaskList = props => {
    const { getData } = props;
    const [activeTab, setActiveTab] = useState('all');
    const [allTags, setTags] = useState([]);
    const [formClosed, setFormClosed] = useState(true);
    const [datesMap, setDatesMap] = useState([])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    // get data
    useEffect(() => getData(), [getData])

    // set up dates
    useEffect(() => {
        let mostRecentDate = "";
        let newDatesMap = [];
        if (props.tasks.length > 0) {
            console.log("got data", props.tasks);
            mostRecentDate = props.tasks[0].due;
            if (mostRecentDate !== null) {
                newDatesMap.push({
                    id: props.tasks[0].id,
                    date: props.tasks[0].due
                })
            }
            else {
                newDatesMap.push({
                    id: props.tasks[0].id,
                    date: "Anytime"
                })
            }
            props.tasks.forEach(task => {
                if (task.due !== mostRecentDate) {
                    console.log(task.due);
                    newDatesMap.push({
                        id: task.id,
                        date: task.due
                    })
                }
            })
        }
        setDatesMap(newDatesMap);
    }, [props.tasks])

    // set up tags
    useEffect(() => {
        console.log(props.tasks);
        const findTags = () => {
            let tags = [];
            props.tasks.forEach(task => {
                task.tags.split(",").forEach(taskTag => {
                    let alreadyPresent = false;
                    tags.forEach(tag => {
                        if (tag === taskTag) {
                            alreadyPresent = true;
                        }
                    })
                    if ((alreadyPresent === false) && (taskTag !== "")) {
                        tags.push(taskTag);
                    }
                })
            })
            setTags(tags);
        }
        findTags();
    }, [props.tasks])
    return (
        <div className="task-list-container">
            <div className="task-list">
                <h2>Tasks</h2>
                {props.data.isFetching ? <Spinner color="primary"/> : <div className="nav-container">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: activeTab === 'all' })}
                            onClick={() => { toggle('all'); }}
                            >
                            All Tasks
                            </NavLink>
                        </NavItem>
                        {allTags.map(tag => (
                            <NavItem key={`${tag}`}>
                                <NavLink
                                className={classnames({ active: activeTab === tag })}
                                onClick={() => { toggle(tag); }}
                                >
                                {tag}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="all">
                            {props.tasks.map(task => {
                                return (
                                    <div key={task.id}>
                                        {datesMap.map(date => (date.id === task.id) && <Date date={date.date}/>)}
                                        <Task task={task} toggleTag={toggle} activeTab={activeTab} formClosed={formClosed} setFormClosed={setFormClosed}/>
                                    </div>
                                )
                            })}
                        </TabPane>
                        {allTags.map(selectedTag => {
                        return (
                            <TabPane tabId={selectedTag} key={selectedTag}>
                                {props.tasks.map(task => {
                                    let match = false;
                                    task.tags.split(",").forEach(tag => {
                                        if (tag === selectedTag) match = true;
                                    })
                                    return (match && 
                                        (<div>
                                            <Task key={task.id} task={task} toggleTag={toggle} activeTab={activeTab} formClosed={formClosed} setFormClosed={setFormClosed}/>
                                        </div>
                                    ))
                                })}
                            </TabPane>
                        )
                    })}
                    </TabContent>
                </div>}
                <TaskForm activeTab={activeTab} formClosed={formClosed} setFormClosed={setFormClosed}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        data: {
            isFetching: state.data.isFetching
        }
    }
}

export default connect(mapStateToProps, { getData })(TaskList)