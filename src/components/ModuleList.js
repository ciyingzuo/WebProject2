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
        this.state = {
            courseId: {},
            Module: []
        };
    }

    componentDidMount() {
        this.moduleServices.findAllModule(this.props.courseId)
            .then(module => {
                this.setState({Module: module})
            });
    }

    render() {
        return (
            <tbody>
            {this.state.Module.map((module, index) =>
                <ModuleRow key={index}
                           Title={module.title}/>)}
            </tbody>
        )
    }
}


export default ModuleList;