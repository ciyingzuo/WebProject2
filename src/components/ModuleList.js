import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseService from "../services/CourseService";
import ModuleRow from "./ModuleRow";
import ModuleServices from "../services/ModuleServices";

class ModuleList extends React.Component {

    constructor(props) {
        super(props);
        this.moduleServices = ModuleServices.instance;
        this.state = {};
    }

    componentDidMount() {
        // this.moduleServices.findAllModule(this.props.courseId)
        //     .then(module => {
        //         this.setState({Module: this.props.Module})
        // });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.course.module.map((module, index) => {
                            // return <li key = {index}>{module.title}</li>
                            return <ModuleRow key={index}
                                              title={module.title}
                                              moduleId={module.id}
                                              lesson={this.props.course.module[index].lesson}/>
                        }
                    )}
                </ul>
            </div>
        )
    }
}


export default ModuleList;