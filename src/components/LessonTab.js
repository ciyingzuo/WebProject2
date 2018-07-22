import React from 'react'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

class LessonTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson: this.props.lesson
        }
    }

    render() {
        if (this.props.currentLessonEdit !== this.state.lesson.id) {
            return <li onClick={() => {
                this.props.currentSelect(this.props.moduleIndex, this.props.lessonIndex, 0);
            }}>{"Lesson:" + this.state.lesson.title}
                <span className="pull-right">
                    <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                       onClick={() => {
                           this.props.setEditingLesson(this.state.lesson.id);
                       }}/>
                                                <i className="fa fa-trash" style={{cursor: 'pointer'}}
                                                   onClick={() => {
                                                       this.props.deleteLesson(this.state.lesson.id)
                                                   }}/>
            </span></li>
        } else {
            return <li className="container-fluid">
                <input onChange={(event) => {
                    this.state.lesson.title = event.target.value
                }} className="form-control" placeholder={this.state.lesson.title}/>
                <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                   onClick={() => {
                       this.props.setEditingLesson(-1);
                       this.props.updateLesson(this.state.lesson)
                   }
                   }/>
            </li>
        }
    }
}

export default LessonTab;