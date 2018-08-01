import {connect} from 'react-redux'
import WidgetListComponent from './WidgetListComponent'
import React from "react";
import CourseService from "../../services/CourseService.client";

// class WidgetContainer extends React.Component{
//     constructor(props) {
//         super(props);
//     }
// }

const stateToPropertyMapper = (state, ownProps) => (
    {
        courseId: ownProps.courseId,
        moduleIndex: ownProps.moduleIndex,
        lessonIndex: ownProps.lessonIndex,
        topicIndex: ownProps.topicIndex,
        topicId: ownProps.topicId,
        course: state.course,
        preview: state.preview,
        widget: []
        // widget: ownProps.course.module[ownProps.moduleIndex].lesson[ownProps.lessonIndex].topic[ownProps.topicIndex].widget
    }
);

const dispatcherToPropertyMapper = dispatch => (
    {
        loadCourse: id => {
            fetch('http://localhost:8080/api/course/'+id).then(response => response.json())
                .then(course => dispatch(
                    {
                        type: 'LOAD_COURSE',
                        course: course
                    }
                ));
        },
        loadWidget: topicId => {
            fetch('http://localhost:8080/api/widget/'+topicId).then(response => response.json())
                .then(widget => dispatch(
                    {
                        type: 'LOAD_WIDGET',
                        widget: widget
                    }
                ));
        },
        deleteWidget: course => dispatch({
            type: 'DELETE_WIDGET',
            course: course
        }),
        createWidget: course => dispatch({
            type: 'CREATE_WIDGET',
            course: course
        }),
        togglePreview: () => dispatch({
            type: 'TOGGLE_PREVIEW'
        }),
        updateWidget: course => dispatch({
            type: 'UPDATE_WIDGET',
            course: course
        }),
        saveWidget: (moduleIndex, lessonIndex, topicIndex, topicId) => dispatch({
            type: 'SAVE_WIDGET',
            moduleIndex: moduleIndex,
            lessonIndex: lessonIndex,
            topicIndex: topicIndex,
            topicId: topicId,
        }),
        loadAllWidgets: id => {
            fetch('http://localhost:8080/api/widget/' + id).then(response => response.json())
                .then(widget => dispatch(
                    {
                        type: 'ALL_WIDGETS',
                        widgets: widget
                    }
                ));
        }
    }
);

const WidgetListContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (WidgetListComponent);

export default WidgetListContainer