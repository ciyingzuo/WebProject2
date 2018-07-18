let _singleton = Symbol();

class LessonService {

    Lesson_API_URL = 'http://localhost:8080/api/lesson';

    deleteLesson(lessonId) {
        return fetch(this.Lesson_API_URL + '/delete/' + lessonId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    findLessonById(lessonId) {
        return fetch(this.Lesson_API_URL + '/' + lessonId)
            .then(function(response){
                return response.json();
            });
    }

    createLesson(lesson) {
        return fetch(this.Lesson_API_URL, {
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


    findAllLesson(moduleId) {
        return fetch(this.Lesson_API_URL + '/' + moduleId)
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
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

}

export default LessonService;