import React from 'react'
import LessonService from "../services/LessonService";


class LessonTabs extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
        this.state = {
            Title: {}
        }
    }

    componentDidMount() {
                this.setState({Title: this.props.title})
    }

    render() {
        return (
            <div>
                {this.state.title}
            </div>
        )
    }
}


export default LessonTabs;