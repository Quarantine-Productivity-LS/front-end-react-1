import React, { useState, useEffect } from 'react'
import Task from './Task'
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

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => getData(), [getData])

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
                    if (alreadyPresent === false) {
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
                            {props.tasks.map(task => <Task key={task.id} task={task} toggleTag={toggle} activeTab={activeTab}/>)}
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
                                        (
                                        <Task key={task.id} task={task} toggleTag={toggle} activeTab={activeTab}/>
                                    ))
                                })}
                            </TabPane>
                        )
                    })}
                    </TabContent>
                </div>}
                <TaskForm activeTab={activeTab} />
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