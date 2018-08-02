export const widgetReducer = (state, action) => {

    switch (action.type) {

        case 'LOAD_COURSE':
            console.log("LOAD_COURSE");
            return {
                course: action.course,
                preview: state.preview
            };
        case 'TOGGLE_PREVIEW':
            console.log("TOGGLE_PREVIEW:" + !state.preview);
            return {
                course: state.course,
                preview: !state.preview
            };
        case 'SAVE_WIDGET':
            console.log("SAVE_WIDGET");
            fetch('http://localhost:8080/api/widget/'+action.topicId, {
                method: 'put',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(state.course.module[action.moduleIndex].lesson[action.lessonIndex].topic[action.topicIndex].widget)
            }).then(response => response.json()).then(widget => {
                let course = state.course;
                course.module[action.moduleIndex].lesson[action.lessonIndex].topic[action.topicIndex].widget = widget;
                return {
                    course: course,
                    preview: state.preview
                }
            });
        case 'DELETE_WIDGET':
            console.log("DELETE_WIDGET");
            return {
                preview: state.preview,
                course: action.course
            };
        case 'CREATE_WIDGET':
            console.log("CREATE_WIDGET");
            return {
                preview: state.preview,
                course: action.course
            };
        case 'UPDATE_WIDGET':
            console.log("UPDATE_WIDGET");
            let course = state.course;
            course.module[action.moduleIndex].lesson[action.lessonIndex].topic[action.topicIndex].widget[action.widgetIndex] = action.widget;
            return {
                course: course,
                preview: state.preview
            };
        default:
            return state
    }
};