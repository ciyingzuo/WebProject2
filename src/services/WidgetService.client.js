let _singleton = Symbol();

class WidgetServiceClient {

    HEROKU_URL= 'https://ciyingzuo-webdev-hw1.herokuapp.com/api/widget/';
    LOCAL_URL = 'http://localhost:8080/api/widget/';
    WIDGET_API_URL = this.LOCAL_URL;

    deleteWidget(widgetId) {
        return fetch(this.WIDGET_API_URL + widgetId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    createLesson(widget, topicId) {
        return fetch(this.WIDGET_API_URL + topicId, {
            method: 'post',
            body: JSON.stringify(widget),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            });
    }

    updateLesson(widget, topicId){
        return fetch(this.WIDGET_API_URL + topicId, {
            method: 'put',
            body: JSON.stringify(widget),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(widget => {
            return widget;
        });
    }

    findAllWidgetForTopic(topicId) {
        return fetch(this.WIDGET_API_URL + topicId)
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
            this[_singleton] = new WidgetServiceClient(_singleton);
        return this[_singleton]
    }

}

export default WidgetServiceClient;