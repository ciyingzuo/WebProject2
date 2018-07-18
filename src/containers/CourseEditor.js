import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseService from "../services/CourseService";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            course: {
                modules: [{lessons: [{topics: [{}]}]}]
            }
        }
    }


    componentDidMount() {
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then(course => {
                this.setState({course: course})
            });
    }







    render() {
        return (
            <tr>
                <td>
                    <Router>
                        <div className="container-fluid">
                            <Link to={'/'+this.props.course.title}>{this.props.course.title}</Link>
                            <Route path={'/'+this.props.course.title}/>
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





    // render() {
    //     return (
    //         <div>
    //             <h1>Course Editor {this.props.match.params.courseId}</h1>
    //             <ModuleList course={this.state.course}/>
    //         </div>
    //     )
    // }



}

export default CourseEditor;