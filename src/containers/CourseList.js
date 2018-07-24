import React from 'react';

import CourseRow from '../components/CourseRow';

import CourseServiceClient from '../services/CourseService.client';


class CourseList extends React.Component {

    constructor() {

        super();
        this.updatePage = this.updatePage.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.courseService = CourseServiceClient.instance;

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


    updatePage() {


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
            .then(() => this.componentDidMount())

    };


    updateCourse = (course) => {

        this.courseService.updateCourse(course)

            .then(() => this.componentDidMount())

    };


    createCourse = () => {

        this.courseService.createCourse(this.state.newCourse)

            .then(() => this.componentDidMount());

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

                    {this.state.courses.map((course) =>

                        <CourseRow key={course.id}

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