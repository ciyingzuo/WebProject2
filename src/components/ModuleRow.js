import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LessonService from "../services/LessonService";
import LessonTabs from "./LessonTabs";

class ModuleRow extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.state = {
            Title: {},
            Lesson: []

        }
    }

    componentDidMount() {
        this.lessonService.findAllLesson(this.props.ModuleId)
            .then(lesson => {
                this.setState({Lesson: lesson})
            });
    }

    render() {
        return (
            <tbody>
            {this.state.Lesson.map((lesson, index) =>
                <LessonTabs key={index}
                            Title={lesson.title}
                            LessonId={lesson.id}/>)}
            </tbody>
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