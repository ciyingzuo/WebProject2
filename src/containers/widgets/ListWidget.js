import React from 'react'

export const ListWidget = ({widget, updateWidget, preview, index, widgetList, moduleIndex, lessonIndex, topicIndex}) => {
    let text;
    let widgetType;
    let ordered = false;

    function orderPrepare(text) {
        let newText = [];
        text.split('\n').map((item, index) => {
            newText = [
                {content: item},
                ...newText
            ]
        });
        return newText
    }
    function order(propertyName) {
            return function(object1, object2) {
                let value1 = object1[propertyName];
                let value2 = object2[propertyName];
                return value1.localeCompare(value2);
            };
    }

    return (
        <div>
            <select ref={node => widgetType = node} className="form-control" value="LIST"
                    onChange={() => {
                        let w = {
                            title: widget.title,
                            id: widget.id,
                            type: widgetType.value,
                            text: widget.text,
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
                              this.ordered = !this.ordered;
                          console.log(this.ordered)}}
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
                    widget_order: widget.widget_order
                };
                updateWidget(w, moduleIndex, lessonIndex, topicIndex, index)
            }} ref={node => text = node} className="form-control">
            </textarea>
            <h4>Preview</h4>
            {!this.ordered &&
            <ul>
                {widget.text.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {this.ordered &&
            <ol>
                {orderPrepare(widget.text).sort(order("text")).map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }

        </div>
    );
};