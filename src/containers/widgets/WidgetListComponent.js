import React from 'react'
import {HeadingWidget} from "./HeadingWidget"
import {ListWidget} from "./ListWidget";
import {YouTubeWidget} from "./YouTubeWidget"
import {ParagraphWidget} from "./ParagraphWidget";
import {LinkWidget} from "./LinkWidget";
import {ImageWidget} from "./ImageWidget";
import Toggle from 'react-toggle'

class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadCourse(this.props.courseId);
        this.widgetList= [];
        // this.props.loadWidget(this.props.topicId);
    }

    // deleteWidget(widgetList, widgetId) {
    //     widgetList.filter(
    //         widget => widget.id !== widgetId
    //     );
    //     let newCourse = Object.assign({}, this.props.course);
    //     newCourse.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget = widgetList;
    //     this.props.deleteWidget(newCourse)
    // }

    order(widgetList) {
        function compareUp(propertyName) {
            return function (object1, object2) {
                let value1 = object1[propertyName];
                let value2 = object2[propertyName];
                return value1 - value2;
            }
        }

        widgetList.sort(compareUp("widget_order"));
        widgetList.map((widget, index) => {
            widget.widget_order = index
        })
    }

    updateWidget(widget, index){
        console.log(this.widgetList);
        this.widgetList[index] = widget;
        let newCourse = Object.assign({}, this.props.course);
        newCourse.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget = this.widgetList;
        this.props.updateWidget(newCourse)
    }

    orderUp(index) {
        this.widgetList[index].widget_order = this.widgetList[index].widget_order - 1;
        this.widgetList[index - 1].widget_order = this.widgetList[index - 1].widget_order + 1;
    }

    orderDown(index) {
        this.widgetList[index].widget_order = this.widgetList[index].widget_order + 1;
        this.widgetList[index + 1].widget_order = this.widgetList[index + 1].widget_order - 1;
    }

    render() {
// let widgetList;
        if (this.props.topicIndex === 0) {
            return null
        }
        if (this.props.course !== null && this.props.course !== undefined) {
            this.widgetList = this.props.course.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget;
        }
        this.order(this.widgetList);
        return (
            <div>
                <div className="float-right" >
                <button onClick={() => this.props.saveWidget(this.props.moduleIndex,
                    this.props.lessonIndex, this.props.topicIndex, this.props.topicId)}
                        className="btn btn-primary">
                    Save
                </button>
                <label>
                    <Toggle
                        defaultChecked={this.props.preview}
                        onChange={this.props.togglePreview} />
                    <span>Toggle Preview</span>
                </label>
                </div>
                <div>
                <h1>Widget List ({this.widgetList.length})</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input ref={node => this.widgetTitle = node} className="form-control"/>
                        <input ref={node => this.widgetText = node} className="form-control"/>
                        <input ref={node => this.widgetSrc = node} className="form-control"/>
                        <button onClick={() => {
                            let widget = {
                                widget_order: this.widgetList.length + 1,
                                title: this.widgetTitle.value,
                                type: this.widgetType.value,
                                src: this.widgetSrc.value,
                                text: this.widgetText.value
                            };
                            this.widgetTitle.value = '';
                            this.widgetList = [
                                widget,
                                ...this.widgetList
                            ];
                            let newCourse = Object.assign({}, this.props.course);
                            newCourse.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget = this.widgetList;
                            this.props.createWidget(newCourse)
                        }} className="btn btn-success">Add Widget
                        </button>
                        <select ref={node => this.widgetType = node} className="form-control">
                            <option value="HEADING">Heading Widget</option>
                            <option value="PARAGRAPH">Paragraph Widget</option>
                            <option value="IMAGE">Image Widget</option>
                            <option value="LINK">Link Widget</option>
                            <option value="LIST">List Widget</option>
                            <option value="YOUTUBE">Youtube Widget</option>
                        </select>
                    </li>
                    {this.widgetList.map((widget, index) => {
                            return (<li className="list-group-item" key={index}>
                                {widget.src} ({widget.id}) - {widget.type}
                                <button className="float-right btn btn-danger"
                                        onClick={() => {
                                            let newWidgetList = this.widgetList.filter(
                                                widgets => widgets.id !== widget.id
                                            );
                                            let newCourse = Object.assign({}, this.props.course);
                                            newCourse.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget = newWidgetList;
                                            this.props.deleteWidget(newCourse)
                                        }}>
                                    Delete
                                </button>
                                <button className="float-right btn btn-danger"
                                        onClick={() => {
                                            this.orderUp(index);
                                            let newCourse = Object.assign({}, this.props.course);
                                            newCourse.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget = this.widgetList;
                                            this.props.createWidget(newCourse)
                                        }}>
                                    Up
                                </button>
                                <button className="float-right btn btn-danger"
                                        onClick={() => {
                                            this.orderDown(index);
                                            let newCourse = Object.assign({}, this.props.course);
                                            newCourse.module[this.props.moduleIndex].lesson[this.props.lessonIndex].topic[this.props.topicIndex].widget = this.widgetList;
                                            this.props.createWidget(newCourse)
                                        }}>
                                    Down
                                </button>
                                <div>
                                    {widget.type === 'PARAGRAPH' &&
                                    <ParagraphWidget widget={widget} preview={this.props.preview}
                                    index={index} updateWidget={this.updateWidget}/>}
                                    {widget.type === 'LINK' &&
                                    <LinkWidget widget={widget} preview={this.props.preview}
                                                index={index} updateWidget={this.updateWidget}/>}
                                    {widget.type === 'IMAGE' &&
                                    <ImageWidget widget={widget} preview={this.props.preview}
                                                 index={index} updateWidget={this.updateWidget}/>}
                                    {widget.type === 'YOUTUBE' &&
                                    <YouTubeWidget widget={widget} preview={this.props.preview}
                                                   index={index} updateWidget={this.updateWidget}/>}
                                    {widget.type === 'LIST' &&
                                    <ListWidget widget={widget} preview={this.props.preview}
                                                index={index} updateWidget={this.updateWidget}/>}
                                    {widget.type === 'HEADING' &&
                                    <HeadingWidget widget={widget} preview={this.props.preview}
                                                   index={index} updateWidget={this.updateWidget}/>}
                                </div>
                            </li>)
                        }
                    )}
                </ul>
                </div>
            </div>
        )
    }
}

export default WidgetListComponent