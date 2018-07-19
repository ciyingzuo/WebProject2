import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseEditor from "./CourseEditor";

class CourseRow extends React.Component {
    render() {
        return (
            <tr>
                <td>
                    <Router>
                        <div className="container-fluid">
                            <Link to={'/courseEditor/'+this.props.course.id}>{this.props.course.title}</Link>
                            <Route path={'/courseEditor/:courseId'} component={CourseEditor}/>
                        </div>

                    </Router>
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={() =>
                                this.props.deleteCourse(this.props.course.id)
                            }>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default CourseRow;