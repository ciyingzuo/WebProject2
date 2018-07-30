import React from 'react'
import {HeadingWidget} from "./HeadingWidget"
import {ListWidget} from "./ListWidget";
import {YouTubeWidget} from "./YouTubeWidget"
import {ParagraphWidget} from "./ParagraphWidget";
import {LinkWidget} from "./LinkWidget";

class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
        let widgetTitle;
        let widgetType;
        this.props.loadAllWidgets(this.props.topicId);
        console.log(this.props.topicId)
    }

    render() {
        return (
            <div>
                <button onClick={this.props.saveWidgets}
                        className="btn btn-primary float-right">
                    Save
                </button>
                <h1>Widget List ({this.props.widgets.length})</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input ref={node => this.widgetTitle = node} className="form-control"/>
                        <button onClick={() => {
                            let widget = {
                                title: this.widgetTitle.value,
                                id: (new Date()).getTime(),
                                widgetType: this.widgetType.value
                            };
                            this.widgetTitle.value = '';
                            this.props.createWidget(widget)
                        }} className="btn btn-success">Add Widget
                        </button>
                        <select ref={node => this.widgetType = node} className="form-control">
                            <option value="HEADING">Heading Widget</option>
                        </select>
                    </li>
                    {this.props.widgets.map((widget, index) =>
                        <li className="list-group-item"
                            key={index}>
                            {widget.title} ({widget.id}) - {widget.widgetType}
                            <button className="float-right btn btn-danger"
                                    onClick={() => this.props.deleteWidget(widget.id)}>
                                Delete
                            </button>
                            <div>
                                {widget.widgetType === 'PARAGRAPH' &&
                                <ParagraphWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'LINK' &&
                                <LinkWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'IMAGE' &&
                                <LinkWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'YOUTUBE' &&
                                <YouTubeWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'LIST' &&
                                <ListWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                                {widget.widgetType === 'HEADING' &&
                                <HeadingWidget widget={widget} updateWidget={this.props.updateWidget}/>}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default WidgetListComponent