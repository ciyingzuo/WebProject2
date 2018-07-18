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
                modules: [{lessons: []}]
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
                    <button className="btn btn-danger"
                            onClick={() =>
                                this.props.deleteCourse(this.props.course.id)
                            }>
                        Delete
                    </button>

                    <tbody>
                        <ModuleList courseId={this.props.course.id}/>
                    </tbody>


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