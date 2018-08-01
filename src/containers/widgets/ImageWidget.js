import React from 'react'

export const ImageWidget = ({widget, updateWidget, preview, index}) => {
    let text;
    let src;
    return(
        <div>
            <h3>ImageWidget - {widget.title}</h3>
            <input onChange={() => {
                widget.src = src.value;
                updateWidget(widget, index)
            }} ref={node => src = node} className="form-control">
            </input>
            <input onChange={() => {
                widget.text = text.value;
                updateWidget(widget)
            }} ref={node => text = node} className="form-control">
            </input>
            <h4>
                Preview
            </h4>
                <img src={widget.src}  alt={widget.text} />
        </div>
    )
};