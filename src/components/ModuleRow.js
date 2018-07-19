import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LessonService from "../services/LessonService";
import LessonTab from "./LessonTab";
import ModuleService from "../services/ModuleService";

class ModuleRow extends React.Component {

    constructor(props) {
        super(props);
        this.moduleService = ModuleService.instance;
        this.state = {}
    }

    componentDidMount() {
        // this.lessonService.findAllLesson(this.props.ModuleId)
        //     .then(lesson => {
        // this.setState({Lesson: this.props.Lesson})
        // });
    }

    render() {
        console.log("mid"+this.props.moduleId)
        return (
            <tr>
                <td>
                    <h1>
                {"Module: " + this.props.title}
                    </h1>
                    {this.props.lesson.map((lesson, index) =>{
                        return <LessonTab key={index}
                                          title={lesson.title}
                                          lessonId={lesson.id}/>})}
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={() =>
                                this.moduleService.deleteModule(this.props.moduleId)
                            }>
                        Delete
                    </button>
                </td>
            </tr>
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