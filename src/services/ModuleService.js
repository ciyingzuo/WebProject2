let _singleton = Symbol();

class ModuleService {

    MODULE_API_URL = 'http://localhost:8080/api/module/';

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


    findAllModule(courseId) {
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
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

}

export default ModuleService;