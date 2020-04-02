import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
import './Task.css'

const Date = ({date}) => {
    return (
        <div className="task-container">
            <div className="shown-info" style={{fontWeight: "bold"}}>{(date !== "Anytime") ? <Moment date={moment(date)} format="MMM Do, YYYY" /> : <div>{date}</div>}</div>
        </div>
    )
}

export default Date
