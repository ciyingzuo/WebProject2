import React from 'react'
import ReactDOM from 'react-dom'
import CourseList from "./CourseList";

class CourseManager extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <CourseList/>
            </div>
        )
    }
}

export default CourseManager;