import React from 'react'

export const LinkWidget = ({widget, updateWidget, preview, index}) => {
    let text;
    let href;
    return(
        <div>
            <h3>LinkWidget - {widget.title}</h3>
            <input onChange={() => {
                widget.href = href.value;
                updateWidget(widget, index)
            }} ref={node => href = node} className="form-control">
            </input>
            <input onChange={() => {
                widget.text = text.value;
                updateWidget(widget)
            }} ref={node => text = node} className="form-control">
            </input>
            <h4>
                Preview
            </h4>
            <div>
                <a href={widget.href}> {widget.text} </a>
            </div>
        </div>
    )
};