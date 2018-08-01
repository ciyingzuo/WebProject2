import React from 'react'

export const ImageWidget = ({widget, updateWidget, preview, index, widgetList, moduleIndex, lessonIndex, topicIndex}) => {
    let widgetType;
    let text;
    let src;
    return (
        <div>
            <select ref={node => widgetType = node} className="form-control" value="IMAGE"
                    onChange={() => {
                        let w = {
                            title: widget.title,
                            id: widget.id,
                            type: widgetType.value,
                            text: widget.text,
                            src: widget.src,
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
            <input placeholder={"Image Link: " + widget.src} onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: widget.text,
                    src: src.value,
                    widget_order: widget.widget_order
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => src = node} className="form-control">
            </input>
            <input placeholder={"Image Description: " + widget.text} onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: text.value,
                    src: widget.src,
                    widget_order: widget.widget_order
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => text = node} className="form-control">
            </input>
            {preview && (<div><h4>Preview</h4>
                <div> {widget.text}</div>
                <img src={widget.src} alt={widget.text}/></div>)}
        </div>
    )
};