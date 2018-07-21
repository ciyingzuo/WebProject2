import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LessonService from "../services/LessonService";
import LessonTab from "./LessonTab";
import ModuleService from "../services/ModuleService";

class ModuleRow extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.state = {
            newLesson:{}
        }
    }

    formChanged = (event) => {
        this.setState({
            newLesson: {
                title: event.target.value,
                // course: {course: {id: parseInt(this.props.match.params.courseId)}}
            }
        })
    };

    componentDidMount() {
        // this.lessonService.findAllLesson(this.props.ModuleId)
        //     .then(lesson => {
        // this.setState({Lesson: this.props.Lesson})
        // });
    }

    render() {
        return (
            <div>
                <h3>
                    {"Module: " + this.props.title}
                    <button className="btn btn-danger"
                            onClick={() =>
                                this.moduleService.deleteModule(this.props.moduleId)
                            }>
                        Delete
                    </button>
                </h3>
                <input onChange={this.formChanged} type="text" placeholder="Lesson"/>
                <button className="btn btn-primary"
                        onClick={() =>
                            this.lessonService.createLesson(this.state.newModule)
                        }>
                    Create Lesson
                </button>
                <ul>
                    {this.props.lesson.map((lesson, index) => {
                        return <LessonTab key={index}
                                          title={lesson.title}
                                          lessonId={lesson.id}/>
                    })}
                </ul>
            </div>
        )
    }


    // render() {
    //     return (
    //         <tr>
    //             <td>
    //                 <tbody>
    //                 <div className="container-fluid">
    //                     {this.props.title}
    //                     {this.state.Lesson.map((lesson, index) => {
    //                         this.state.Lesson.props.title
    //                     })}
    //                 </div>
    //                 </tbody>
    //             </td>
    //         </tr>
    //     )
    // }
}

export default ModuleRow;