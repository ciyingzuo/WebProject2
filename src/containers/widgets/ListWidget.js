import React from 'react'

export const ListWidget = ({widget, updateWidget, preview, index, widgetList, moduleIndex, lessonIndex, topicIndex}) => {
    let text;
    let widgetType;
    let ordered;

    return (
        <div>
            <select ref={node => widgetType = node} className="form-control" value="LIST"
                    onChange={() => {
                        let w = {
                            title: widget.title,
                            id: widget.id,
                            type: widgetType.value,
                            text: widget.text,
                            widget_order: widget.widget_order,
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

            <label><input
                ref={node => ordered = node}
                          onClick={() => {
                              let w = {
                                  title: widget.title,
                                  id: widget.id,
                                  type: widgetType.value,
                                  text: widget.text,
                                  widget_order: widget.widget_order,
                                  ordered: ordered.checked
                              };
                              updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
                          }}
                          checked={widget.ordered}
                          type="checkbox"/> Ordered</label>
            <textarea placeholder={widget.text.split('\n').map((item, index) => (
                {item}
            ))
            } onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: text.value,
                    widget_order: widget.widget_order,
                    ordered: widget.ordered
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => text = node} className="form-control">
            </textarea>
            <h4>Preview</h4>
            {!widget.ordered &&
            <ul>
                {widget.text.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {widget.ordered &&
            <ol>
                {widget.text.split('\n').sort().map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }

        </div>
    );
};