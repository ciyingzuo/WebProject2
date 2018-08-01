import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import CourseEditor from './containers/CourseEditor'
import CourseManager from "./containers/CourseManager";


class App extends React.Component {
    render() {
        return (
                <Router>
                    <div className="container-fluid">
                        <Link to="/whiteboard">Course Manager</Link> |
                        <Route path='/whiteboard' component={CourseManager}/>
                        <Route path='/courseEditor/:courseId' component={CourseEditor}/>
                    </div>
                </Router>

        );

    }
}

ReactDOM.render(
    <App/>,

    document.getElementById('root')
);