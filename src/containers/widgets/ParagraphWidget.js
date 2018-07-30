import React from 'react'

export const ParagraphWidget = ({widget, updateWidget}) => {
    let text;
    return(
        <div>
            <h3>ParagraphWidget - {widget.title}</h3>
            <input onChange={() => {
                let newWidget = {
                    text: text.value,
                    id: widget.id,
                    widgetType: widget.widgetType
                };
                updateWidget(newWidget)
            }} ref={node => text = node} className="form-control">
            </input>
            <h4>
                Preview
            </h4>
            <div>
                {widget.text}
            </div>
        </div>
    )
};