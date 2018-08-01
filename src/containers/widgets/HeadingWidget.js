import React from 'react'

export const HeadingWidget =
    ({widget, updateWidget, preview, index, widgetList, moduleIndex, lessonIndex, topicIndex}) => {
        let widgetType;
        let text;
        let size;
        return (
            <div>
                <select ref={node => widgetType = node} className="form-control" value="HEADING"
                        onChange={() => {
                            let w = {
                                size: widget.size,
                                title: widget.title,
                                id: widget.id,
                                type: widgetType.value,
                                text: widget.text,
                                ordered: widget.ordered
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
                <label htmlFor="text">Heading Text</label>
                <input placeholder={widget.text} onChange={() => {
                    let w = {
                        size: widget.size,
                        title: widget.title,
                        id: widget.id,
                        type: widgetType.value,
                        text: text.value,
                        ordered: widget.ordered
                    };
                    updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
                }}
                       ref={node => text = node}
                       className="form-control" id="text"/>
                <label htmlFor="size">Heading Size</label>
                <select onChange={() => {
                    let w = {
                        size: size.value,
                        title: widget.title,
                        id: widget.id,
                        type: widgetType.value,
                        text: widget.text,
                        ordered: widget.ordered
                    };
                    updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
                }}
                        ref={node => size = node}
                        className="form-control" id="size">
                    <option value="1">Size 1</option>
                    <option value="2">Size 2</option>
                    <option value="3">Size 3</option>
                    <option value="4">Size 4</option>
                </select>
                <h4>Preview{widget.size}</h4>
                {preview && widget.size == '1' && <h1>{widget.text}</h1>}
                {preview && widget.size == '2' && <h2>{widget.text}</h2>}
                {preview && widget.size == '3' && <h3>{widget.text}</h3>}
                {preview && widget.size == '4' && <h4>{widget.text}</h4>}
            </div>
        )
    };