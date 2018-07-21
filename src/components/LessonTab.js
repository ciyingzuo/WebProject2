import React from 'react'
import LessonService from "../services/LessonService";
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class LessonTab extends React.Component {

    constructor(props) {
        super(props);
        this.lessonService = LessonService.instance;
    }

    render() {
        return (
            <div>
                {this.props.title}
                <i onClick={() =>
                    this.lessonService.deleteLesson(this.props.lessonId)
                }
                   className="fas fa-trash-alt"/>

                {/*<button className="btn btn-danger"*/}
                {/*>*/}
                {/*Delete*/}
                {/*</button>*/}
            </div>
        )
    }
}


export default LessonTab;