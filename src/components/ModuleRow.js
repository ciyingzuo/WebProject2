import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseService from "../services/CourseService";

class ModuleRow extends React.Component {

    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {
            Lesson: []
        }
    }


    render() {
        return (
            <tr>
                <td>
                    <tbody>
                    <div className="container-fluid">
                        {this.props.title}
                        {this.state.Lesson.map((lesson, index) => {
                            this.state.Lesson.props.title
                        })}
                    </div>
                    </tbody>
                </td>
            </tr>
        )
    }
}

export default ModuleRow;