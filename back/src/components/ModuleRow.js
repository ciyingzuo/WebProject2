import React from 'react'

class ModuleRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            module: this.props.module,
            newLesson: {}
        }
    }

    formChanged = (event) => {
        this.setState({
            newLesson: {
                title: event.target.value,
            }
        })
    };

    render() {
        if (this.props.currentModuleEdit !== this.state.module.id) {
            return <div>
                <h3>
                    <div>{"Module:" + this.state.module.title}
                        <span className="pull-right">
                        <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                           onClick={() => {
                               console.log("edit: " + this.state.module.id);
                               this.props.setEditingModule(this.state.module.id);
                           }}/>
                        <i className="fa fa-trash" style={{cursor: 'pointer'}}
                           onClick={() => {
                               this.props.deleteModule(this.state.module.id);
                           }}/>
                        </span>
                    </div>
                </h3>
                <input onChange={this.formChanged} type="text" placeholder="Lesson"/>
                <span className="pull-right">
                <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                   onClick={() => {
                       this.props.createLesson(this.state.newLesson, this.props.module.id)
                   }}/>
                        </span>
            </div>
        } else {
            return <div className="container-fluid">
                <input onChange={(event) => {
                    this.state.module.title = event.target.value
                }} className="form-control" placeholder={this.props.module.title}/>
                <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                   onClick={() => {
                       this.props.setEditingModule(-1);
                       this.props.updateModule(this.state.module)
                   }
                   }/>
            </div>
        }
    }


}

export default ModuleRow;