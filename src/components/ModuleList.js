import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CourseService from "../services/CourseService";
import ModuleRow from "./ModuleRow";

class ModuleList extends React.Component {

    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {
            Module: []
        };
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