import React from 'react'
import {Route, Link} from 'react-router-dom'
import CourseEditor from "./CourseEditor";
import CourseService from "../services/CourseService";

class CourseRow extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.state = {
            exist: 0,
            course: this.props.course,
            editing: 0
        }
    }

    switchMode = () => {
        if (this.state.editing === 0) {
            return <div className="container-fluid">
                <Link to={'/courseEditor/' + this.props.course.id}>{this.state.course.title}</Link>
                <Route path={'/courseEditor/:courseId'} component={CourseEditor}/>
            </div>
        } else {
            return <div className="container-fluid">
                <input onChange={(event) => {
                    this.state.course.title = event.target.value
                }} className="form-control" placeholder={this.state.course.title}/>
                <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                   onClick={() => {
                       this.props.updateCourse(this.state.course)
                       this.setState({editing: 0})
                   }
                   }/>
            </div>
        }
    };


    render() {
        if (this.state.exist === 1) {
            return <div/>
        }
        return (
            <tr>
                <td>
                    <div className="container-fluid">{
                        this.switchMode()
                    }
                    </div>
                </td>
                <td>
                    {"Date Created:" + this.state.course.created.toString().substring(0, 10)}
                </td>
                <td>
                    {"Date Modified:" + this.state.course.modified.toString().substring(0, 10)}
                </td>
                <td>
                    <i className="fa fa-trash" style={{cursor: 'pointer'}}
                            onClick={() => {
                                this.setState({exist: 1});
                                this.props.deleteCourse(this.state.course.id);
                            }
                            }/>
                                <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                                onClick={() =>
                                    this.setState({editing: 1})
                                }/>
                                </td>
                                </tr>
                                )
                            }
                    }

                    export default CourseRow;