import React from 'react'

export const LinkWidget = ({widget, updateWidget, preview, index, widgetList, moduleIndex, lessonIndex, topicIndex}) => {
    let text;
    let widgetType;
    let href;
    return (
        <div>
            <select ref={node => widgetType = node} className="form-control" value="LINK"
                    onChange={() => {
                        let w = {
                            title: widget.title,
                            id: widget.id,
                            type: widgetType.value,
                            text: widget.text,
                            href: widget.href,
                            widget_order: widget.widget_order
                        };
                        updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
                    }}>
                <option value="HEADING">HEADING</option>
                <option value="IMAGE">IMAGE</option>
                <option value="LINK">LINK</option>
                <option value="LIST">LIST</option>
                <option value="PARAGRAPH">PARAGRAPH</option>
                <option value="YOUTUBE">YOUTUBE</option>
            </select>
            <input placeholder={"Link Description: " + widget.text} onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: text.value,
                    widget_order: widget.widget_order,
                    href: widget.href
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => text = node} className="form-control">
            </input>
            <input placeholder={"Link Address: " + widget.href} onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: widget.text,
                    widget_order: widget.widget_order,
                    href: href.value
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => href = node} className="form-control">
            </input>
            {preview && (<div><h4>
                Preview
            </h4>
                <div>
                    <a href={widget.href}> {widget.text} </a>
                </div>
            </div>)}
        </div>
    )
};