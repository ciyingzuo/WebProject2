import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseEditor from "./CourseEditor";
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService";
import CourseService from "../services/CourseService";
import TopicService from "../services/TopicService";

class CourseRow extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.moduleService = ModuleService.instance;
        this.lessonService = LessonService.instance;
        this.topicService = TopicService.instance;
        this.state = {
            newCourse: {},
            editing: 0
        }
    }

    formChanged = (event) => {
        this.setState({
            newCourse: {
                title: event.target.value
            }
        })
    };


    render() {
        return (
            <tr>
                <td>
                    <div className="container-fluid">
                    <Link to={'/courseEditor/' + this.props.course.id}>{this.props.course.title}</Link>
                    <Route path={'/courseEditor/:courseId'} component={CourseEditor}/>
                </div>
                </td>
                <td>
                    {"Date Created:"+this.props.course.created.toString().substring(0, 10)}
                </td>
                <td>
                    {"Date Modified:"+this.props.course.modified.toString().substring(0, 10)}
                </td>
                <td>
                    <i className="fas fa-trash"
                       onClick={() =>
                           this.props.deleteCourse(this.props.course.id)
                       }/>
                    <i className="fas fa-plus-square"
                       onClick={() =>
                           this.setState({editing: 1})
                       }/>
                </td>
            </tr>
        )
    }
}

export default CourseRow;