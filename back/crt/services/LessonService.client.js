let _singleton = Symbol();

class LessonServiceClient {

    HEROKU_URL= 'https://ciyingzuo-webdev-hw1.herokuapp.com/api/lesson/';
    LOCAL_URL = 'http://localhost:8080/api/lesson/';
    Lesson_API_URL = this.LOCAL_URL;

    deleteLesson(lessonId) {
        return fetch(this.Lesson_API_URL + lessonId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    createLesson(lesson, moduleId) {
        return fetch(this.Lesson_API_URL + moduleId, {
            method: 'post',
            body: JSON.stringify(lesson),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }

    updateLesson(lesson){
        return fetch(this.Lesson_API_URL + lesson.id, {
            method: 'put',
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    findAllLessonForModule(moduleId) {
        return fetch(this.Lesson_API_URL + moduleId)
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
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

}

export default LessonServiceClient;