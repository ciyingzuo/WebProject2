import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseService from "../services/CourseService";
import ModuleList from "../components/ModuleList";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            course: {
                module: [{title: '', lesson: [{title: ''}]}]
            }
        }
    }

    componentDidMount() {
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then(course => {
                this.setState({course: course})
                this.setState({module: course.modules})
            });
    }

    render() {
        return (
            <div>
                <h3>{this.state.course.title}</h3>
                <button className="btn btn-danger"
                        onClick={() =>
                            this.props.deleteCourse(this.props.match.params.courseId)
                        }>
                    Delete
                </button>
                <ModuleList course={this.state.course}/>
            </div>
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