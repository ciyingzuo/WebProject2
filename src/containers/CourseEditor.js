// import React from 'react'
// import ReactDOM from 'react-dom'
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
// import CourseService from "../services/CourseService";
//
// class CourseEditor extends React.Component {
//     constructor() {
//         super();
//         this.courseService = CourseService.instance;
//         this.state = {
//             newModule: {},
//             Module: []
//         };
//     }
//
//     render() {
//         return (
//             <tr>
//                 <td>
//                     <Router>
//                         <div className="container-fluid">
//                             <Link to={'/'+this.props.course.title}>{this.props.course.title}</Link>
//                             <Route path={'/'+this.props.course.title}/>
//                         </div>
//                     </Router>
//                 </td>
//                 <td>
//                     <button className="btn btn-danger"
//                             onClick={() =>
//                                 this.props.deleteCourse(this.props.course.id)
//                             }>
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         )
//     }
// }
//
// export default CourseEditor;