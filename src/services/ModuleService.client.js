let _singleton = Symbol();

class ModuleServiceClient {

    HEROKU_URL= 'https://ciyingzuo-webdev-hw1.herokuapp.com/api/module/';
    LOCAL_URL = 'http://localhost:8080/api/module/';
    MODULE_API_URL = this.HEROKU_URL;

    deleteModule(moduleId) {
        return fetch(this.MODULE_API_URL + moduleId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    updateModule(module) {
        return fetch(this.MODULE_API_URL + module.id, {
            method: 'put',
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    createModule(module, courseId) {
        return fetch(this.MODULE_API_URL + courseId, {
            method: 'post',
            body: JSON.stringify(module),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }


    findAllModuleForCourse(courseId) {
        return fetch(this.MODULE_API_URL + courseId)
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
            this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    }

}

export default ModuleServiceClient;