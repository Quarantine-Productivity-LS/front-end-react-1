import React, { useState, useEffect } from 'react'
import Task from './Task'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames'
import './TaskList.css'

const TaskList = props => {
    const [activeTab, setActiveTab] = useState('all');
    const [allTags, setTags] = useState([]);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    useEffect(() => {
        const findTags = () => {
            let tags = [];
            props.tasks.forEach(task => {
                task.tags.forEach(taskTag => {
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
                        <NavItem>
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
                        {props.tasks.map(task => <Task task={task}/>)}
                    </TabPane>
                    {allTags.map(selectedTag => {
                    return (
                        <TabPane tabId={selectedTag}>
                            {props.tasks.map(task => {
                                let match = false;
                                task.tags.forEach(tag => {
                                    if (tag === selectedTag) match = true;
                                })
                                return (match && <Task task={task}/>)
                            })}
                        </TabPane>
                    )
                })}
                </TabContent>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, {})(TaskList)