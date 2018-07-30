import {connect} from 'react-redux'
import WidgetListComponent from './WidgetListComponent'
import React from "react";

// class WidgetContainer extends React.Component{
//     constructor(props) {
//         super(props);
//     }
// }

 const stateToPropertyMapper = (state, ownProps) => (
    {
        topicId: ownProps.match.params.topicId,
        widgets: state.widgets
    }
);

const dispatcherToPropertyMapper = dispatch => (
    {
        deleteWidget: widget => dispatch({
            type: 'DELETE_WIDGET',
            widgetId: widget
        }),
        createWidget: widget => dispatch({
            type: 'CREATE_WIDGET',
            widget: widget
        }),
        updateWidget: widget => dispatch({
            type: 'UPDATE_WIDGET',
            widget: widget
        }),
        saveWidgets: () => dispatch({
            type: 'SAVE_WIDGETS'
        }),
        loadAllWidgets: (id) => {
            console.log("fetch");
            fetch('http://localhost:8080/api/widget/'+id).then(response => response.json())
                .then(widget => dispatch(
                    {
                    type: 'ALL_WIDGETS',
                    widget: widget
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