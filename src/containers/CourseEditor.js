import React from 'react'
import CourseService from "../services/CourseService";
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService";
import TopicService from "../services/TopicService";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.moduleService = ModuleService.instance;
        this.lessonService = LessonService.instance;
        this.topicService = TopicService.instance;
        this.state = {
            currentModule: 0,
            currentLesson: 0,
            currentTopic: 0,
            newModule: {},
            newLesson: {},
            newTopic: {},
            course: {
                module: [{title: '', id: '', lesson: [{title: '', id: '', topic: [{title: '', id: ''}]}]}]
            }
        }
    }

    currentSelect(moduleId, lessonId, topicId) {
        this.setState({currentModule: moduleId});
        this.setState({currentLesson: lessonId});
        this.setState({currentTopic: topicId})
    }

    updatePage() {
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then(course => {
                this.setState({course: course});
            });
    }

    componentDidMount() {
        this.courseService.findCourseById(this.props.match.params.courseId)
            .then(course => {
                this.setState({course: course});
            });
    }

    moduleBarChanged = (event) => {
        this.setState({
            newModule: {
                title: event.target.value,
            }
        })
    };

    LessonBarChanged = (event) => {
        this.setState({
            newLesson: {
                title: event.target.value,
            }
        })
    };

    TopicBarChanged = (event) => {
        this.setState({
            newTopic: {
                title: event.target.value,
            }
        })
    };

    render() {

        if (this.state.course.module == null || this.state.course.module == undefined || this.state.course.module.length == 0){
            this.courseService.deleteCourse(this.props.match.params.courseId);
            window.location.href = 'http://localhost:3000/whiteboard';
        }




        return (
            <div>
                <h1>{this.state.course.title}</h1>
                <input onChange={this.moduleBarChanged} type="text" placeholder="Module"/>
                <i className="fas fa-pen"
                   onClick={() => {
                       this.moduleService.createModule(this.state.newModule, this.props.match.params.courseId).then(() => {
                           this.updatePage();
                       })
                   }}>icon</i>
                <div style={{width: '100%'}}>
                    <div style={{width: '20%', float: 'left'}}>
                        {/*Module and Lesson*/}
                        {this.state.course.module.map((module, index) => {
                                return <div key={index}>
                                    <h3>
                                        <div>{"Module:" + module.title}
                                            <span className="pull-right">
                                            <i className="fa fa-trash"
                                               onClick={() => {
                                                   this.moduleService.deleteModule(module.id).then(() => {
                                                       this.updatePage();
                                                   })
                                               }}/>
                                            </span>
                                        </div>
                                    </h3>
                                    <input onChange={this.LessonBarChanged} type="text" placeholder="Lesson"/>
                                    <span className="pull-right">
                                    <i className="fas fas fa-pen"
                                       onClick={() => {
                                           this.lessonService.createLesson(this.state.newLesson, module.id).then(() => {
                                               this.updatePage();
                                           })
                                       }}>icon</i>
                                    </span>
                                    {/*Lesson*/}
                                    {this.state.course.module[index].lesson.map((lesson, i) => {
                                            return <li key={i}
                                                       onClick={() => this.currentSelect(index, i, 0)}>
                                                {"Lesson:" + lesson.title}
                                                <span className="pull-right">
                                                <i className="fa fa-trash"
                                                   onClick={() => {
                                                       this.lessonService.deleteLesson(lesson.id).then(() => {
                                                           this.currentSelect(0, 0, 0);
                                                           this.updatePage();
                                                       })
                                                   }}/>
                                                </span>
                                            </li>
                                        }
                                    )}
                                </div>
                            }
                        )}
                    </div>
                    <div style={{width: '75%', float: 'right'}}>
                        <input onChange={this.TopicBarChanged} type="text" placeholder="Topic"/>
                        <button className="btn btn-primary"
                                onClick={() =>
                                    this.topicService.createTopic(this.state.newTopic,
                                        this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].id).then(() => {
                                        this.updatePage();
                                    })
                                }>
                            Create Topic
                        </button>
                        <ul className="nav nav-tabs">
                            {this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].topic.map((topic, i) => {
                                    return <li key={i} className="nav-item"
                                               onClick={() => this.currentSelect(this.state.currentModule,
                                                   this.state.currentLesson, i)}>
                                        <a className="nav-link" href="#">
                                            {"Topic:" + topic.title}
                                            <i className="fa fa-trash"
                                               onClick={() => this.topicService.deleteTopic(topic.id).then(() => {
                                                   this.updatePage();
                                               })}

                                            />
                                        </a>
                                    </li>
                                }
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


    // render() {
    //     return (
    //         <div>
    //             <h1>Course Editor {this.props.match.params.courseId}</h1>
    //             <ModuleList course={this.state.course}/>
    //         </div>
    //     )
    // }


}

export default CourseEditor;