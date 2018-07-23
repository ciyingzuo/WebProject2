import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import CourseList from './containers/CourseList'
import CourseEditor from './containers/CourseEditor'

class WhiteBoard extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Whiteboard</h1><CourseList/>
           </div>
        )
    }
}

class App extends React.Component {
    render() {
        return(
            <Router>
                <div className="container-fluid">
                    <Link to="/whiteboard">WhiteBoard</Link> |
                    <Route path='/whiteboard' component={WhiteBoard}/>
                    <Route path='/courseEditor/:courseId' component={CourseEditor}/>
                </div>

            </Router>

        );

    }}

ReactDOM.render(

    <App/>,

    document.getElementById('root')

);