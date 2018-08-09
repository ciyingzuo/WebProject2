import React from 'react'

export const YouTubeWidget = ({widget, updateWidget, preview, index, widgetList, moduleIndex, lessonIndex, topicIndex}) => {
    let src;
    let widgetType;
    return (
        <div>
            <select ref={node => widgetType = node} className="form-control" value="YOUTUBE"
                    onChange={() => {
                        let w = {
                            title: widget.title,
                            id: widget.id,
                            type: widgetType.value,
                            text: widget.text,
                            widget_order: widget.widget_order,
                            src: widget.src
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
            <input onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: widget.text,
                    widget_order: widget.widget_order,
                    src: src.value
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => src = node} className="form-control" placeholder={"source: " + widget.src}>
            </input>
            {preview && (<div><h4>Preview</h4>
            <div>{widget.src}</div>
            <iframe width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${widget.src}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen/>
            </div>)}
        </div>
    )
};