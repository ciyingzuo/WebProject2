import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LessonService from "../services/LessonService";
import LessonTab from "./LessonTab";

class ModuleRow extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.state = {}
    }

    componentDidMount() {
        // this.lessonService.findAllLesson(this.props.ModuleId)
        //     .then(lesson => {
        // this.setState({Lesson: this.props.Lesson})
        // });
    }

    render() {
        return (
            <div>
                {this.props.title}
                {this.props.lesson.map((lesson, index) =>{
                    return <LessonTab key={index}
                                title={lesson.title}
                                lessonId={lesson.id}/>})}
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