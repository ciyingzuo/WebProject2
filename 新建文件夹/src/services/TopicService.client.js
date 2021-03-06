let _singleton = Symbol();

class TopicServiceClient {

    HEROKU_URL= 'https://ciyingzuo-webdev-hw1.herokuapp.com/api/topic/';
    LOCAL_URL = 'http://localhost:8080/api/topic/';
    Topic_API_URL = this.HEROKU_URL;

    deleteTopic(topicId) {
        return fetch(this.Topic_API_URL + '/delete/' + topicId, {
            method: 'delete'
        })
            .then(function (response) {
                return response;
            });
    }

    createTopic(topic, lessonId) {
        return fetch(this.Topic_API_URL + '/' + lessonId + "/topic", {
            method: 'post',
            body: JSON.stringify(topic),
            headers: {
                'content-type': 'application/json'
            }
        })
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
            this[_singleton] = new TopicServiceClient(_singleton);
        return this[_singleton]
    }

}

export default TopicServiceClient;