let _singleton = Symbol();

class CourseServiceClient {

    HEROKU_URL= 'https://ciyingzuo-webdev-hw1.herokuapp.com/api/course/';
    LOCAL_URL = 'http://localhost:8080/api/course/';
    COURSE_API_URL = this.HEROKU_URL;

    deleteCourse(courseId) {

        return fetch(this.COURSE_API_URL + 'delete/' + courseId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    updateCourse(course){
        return fetch(this.COURSE_API_URL + course.id, {
            method: 'put',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    findCourseById(courseId) {
        return fetch(this.COURSE_API_URL + courseId)
            .then(function(response){
                return response.json();
            });
    }

    createCourse(course) {
        return fetch(this.COURSE_API_URL, {
            method: 'post',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }


    findAllCourses() {
        return fetch(this.COURSE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }


    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseServiceClient(_singleton);
        return this[_singleton]
    }

}

export default CourseServiceClient;