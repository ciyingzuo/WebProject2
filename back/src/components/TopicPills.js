import React from 'react'

class TopicPills extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: this.props.topic,
        }
    }

    render() {
        return <li className="nav-item"
                   onClick={() => this.props.currentSelect(this.props.currentModule,
                       this.props.currentLesson, this.props.topicIndex)}>
            <a className="nav-link" href="">
                {"Topic:" + this.state.topic.title}
                <i className="fa fa-trash" style={{cursor: 'pointer'}}
                   onClick={() => this.props.deleteTopic(this.state.topic.id)}/>
            </a>
        </li>

    }
}


export default TopicPills;