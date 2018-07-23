import React from 'react';

import CourseRow from './CourseRow';

import CourseService from '../services/CourseService';


class CourseList extends React.Component {

    constructor() {

        super();

        this.courseService = CourseService.instance;

        this.state = {

            newCourse: {},

            courses: []

        };

    }


    componentDidMount() {

        this.courseService.findAllCourses()

            .then(courses => {

                this.setState({courses: courses});

            });

    }


    formChanged = (event) => {

        this.setState({

            newCourse: {

                title: event.target.value

            }

        })

    };


    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)

    };


    updateCourse = (course) => {

        this.courseService.updateCourse(course)

            .then(() => this.componentDidMount())

    };


    createCourse = () => {

        this.courseService.createCourse(this.state.newCourse)

            .then(course => this.setState({course: course}));

        this.setState({newCourse: ''});

    };


    render() {

        return (

            <div>

                <h2>Course List</h2>

                <table className="table">

                    <thead>

                    <tr>

                        <th>Title</th>

                    </tr>

                    <tr>

                        <th><input onChange={this.formChanged} className="form-control"/></th>

                        <th>

                            <button onClick={this.createCourse} className="btn btn-primary">Add Course</button>

                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {this.state.courses.map((course, index) =>

                        <CourseRow key={index}

                                   deleteCourse={this.deleteCourse}

                                   updateCourse={this.updateCourse}

                                   course={course}/>)}

                    </tbody>

                </table>

            </div>

        )

    }

}


export default CourseList;