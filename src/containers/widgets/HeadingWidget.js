import React from 'react'

export const HeadingWidget =
    ({widget, updateWidget, preview, index}) => {
        let widgetType;
        let text;
        let size;
        return (
            <div>
                <h3>Heading Widget</h3>
                <select ref={node => widgetType = node} className="form-control"
                        onChange={() => {
                            console.log(widgetType.value);
                            let w = {
                                id: widget.id,
                                type: widgetType.value,
                                text: widget.text,
                                ordered: widget.ordered
                            };
                            updateWidget(w)
                        }}>
                    <option value="HEADING">HEADING</option>
                    <option value="PARAGRAPH">PARAGRAPH</option>
                    <option value="IMAGE">IMAGE</option>
                </select>
                <label htmlFor="text">Heading Text</label>
                <input placeholder={widget.text} onChange={() => {
                    widget.text = text.value;
                    updateWidget(widget, index)
                }}
                       ref={node => text = node}
                       className="form-control" id="text"/>
                <label htmlFor="size">Heading Size</label>
                <select onChange={() => {
                    widget.size = size.value;
                    updateWidget(widget)
                }}
                        ref={node => size = node}
                        className="form-control" id="size">
                    <option value="1">Size 1</option>
                    <option value="2">Size 2</option>
                    <option value="3">Size 3</option>
                    <option value="4">Size 4</option>
                </select>
                <h4>Preview</h4>
                {widget.size === '1' && <h1>{widget.text}</h1>}
                {widget.size === '2' && <h2>{widget.text}</h2>}
                {widget.size === '3' && <h3>{widget.text}</h3>}
                {widget.size === '4' && <h4>{widget.text}</h4>}
            </div>
        )
    };