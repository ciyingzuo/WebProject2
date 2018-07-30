let initialState = {
    widgets: [
        {title: 'YouTube Widget 1', id: 3, widgetType: 'YOUTUBE', src: 'agijCJ5Ye-w'}
    ]
};

export const widgetReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ALL_WIDGET':
            return {
                widget: action.widget
            };
        case 'SAVE_WIDGETS':
            fetch('http://localhost:8080/api/widget', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(state.widgets)
            });
            return state;
        case 'DELETE_WIDGET':
            return {
                widgets: state.widgets.filter(
                    widget => widget.id !== action.widgetId
                )
            };
        case 'CREATE_WIDGET':
            return {
                widgets: [
                    action.widget,
                    ...state.widgets
                ]
            };
        case 'UPDATE_WIDGET':
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.widget.id) {
                        return action.widget
                    } else {
                        return widget
                    }
                })
            };
        default:
            return state
    }
};