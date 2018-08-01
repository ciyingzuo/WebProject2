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
                            ordered: widget.ordered,
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

            <label><input ref={node => ordered = node}
                          onClick={() => {
                              let w = {
                                  title: widget.title,
                                  id: widget.id,
                                  type: widget.type,
                                  text: widget.text,
                                  ordered: ordered.checked,
                                  widget_order: widget.widget_order
                              };
                              updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
                          }}
                          checked={widget.ordered}
                          type="checkbox"/> Ordered</label>
            <textarea placeholder={widget.listItems.split('\n').map((item, index) => (
                {item}
            ))
            } onChange={() => {
                let w = {
                    title: widget.title,
                    id: widget.id,
                    type: widget.type,
                    text: text.value,
                    ordered: widget.ordered,
                    widget_order: widget.widget_order
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => text = node} className="form-control">
            </textarea>
            <h4>Preview</h4>
            {!widget.ordered &&
            <ul>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {widget.ordered &&
            <ol>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }

        </div>
    );
}