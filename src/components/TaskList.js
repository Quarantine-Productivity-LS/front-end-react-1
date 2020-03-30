import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap'
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