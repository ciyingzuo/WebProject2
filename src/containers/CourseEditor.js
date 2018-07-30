import React from 'react'
import CourseServiceClient from "../services/CourseService.client";
import ModuleServiceClient from "../services/ModuleService.client";
import LessonServiceClient from "../services/LessonService.client";
import TopicServiceClient from "../services/TopicService.client";
import ModuleRow from "../components/ModuleRow";
import LessonTab from "../components/LessonTab";
import TopicPills from "../components/TopicPills";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import WidgetListContainer from "./widgets/WidgetListContainer";
import {widgetReducer} from "../reducer/widgetReducer";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseServiceClient.instance;
        this.moduleService = ModuleServiceClient.instance;
        this.lessonService = LessonServiceClient.instance;
        this.topicService = TopicServiceClient.instance;
        this.state = {
            currentModule: 0,
            currentLesson: 0,
            currentTopic: 0,
            currentModuleEdit: 0,
            currentLessonEdit: 0,
            newModule: {},
            newLesson: {},
            newTopic: {},
            course: {
                module: [{title: '', id: '', lesson: [{title: '', id: '', topic: [{title: '', id: ''}]}]}]
            }
        }
    }

    deleteModule = (moduleId) => {
        this.moduleService.deleteModule(moduleId).then(() => this.componentDidMount())
    };

    updateModule = (module) => {
        this.moduleService.updateModule(module).then(() => this.componentDidMount())
    };

    deleteLesson = (lessonId) => {
        this.currentSelect(0, 0, 0);
        this.lessonService.deleteLesson(lessonId).then(() => this.componentDidMount())
    };

    updateLesson = (lesson) => {
        this.lessonService.updateLesson(lesson).then(() => this.componentDidMount())
    };

    createLesson = (lesson, moduleId) => {
        this.lessonService.createLesson(lesson, moduleId).then(() => this.componentDidMount())
    };

    deleteTopic = (topicId) => {
        this.topicService.deleteTopic(topicId).then(() => this.componentDidMount())
    };

    currentSelect = (moduleId, lessonId, topicId) => {
        this.setState({currentModule: moduleId});
        this.setState({currentLesson: lessonId});
        this.setState({currentTopic: topicId})
    };

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

    TopicBarChanged = (event) => {
        this.setState({
            newTopic: {
                title: event.target.value,
            }
        })
    };

    setEditingModule = (moduleId) => {
        this.setState({currentModuleEdit: moduleId});
    };

    setEditingLesson = (lessonId) => {
        this.setState({currentLessonEdit: lessonId})
    };

    render() {
        // let iniState = {
        //     widgets: [],
        //     topicID: this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].topic[this.state.currentTopic].id
        // };
        let store = createStore(widgetReducer);
        // console.log(this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].topic[this.state.currentTopic].id);
        if (this.state.course.module == null || this.state.course.module === undefined || this.state.course.module.length === 0) {
            this.courseService.deleteCourse(this.props.match.params.courseId);
            // window.location.href = 'https://ciyingzuo-webdev-hw2.herokuapp.com/whiteboard';
        }
        return (
            <div>
                <h1>{this.state.course.title}</h1>
                <input onChange={this.moduleBarChanged} type="text" placeholder="Module"/>
                <i className="fa fa-plus-square" style={{cursor: 'pointer'}}
                   onClick={() => {
                       this.moduleService.createModule(this.state.newModule, this.props.match.params.courseId).then(() => {
                           this.componentDidMount();
                       })
                   }}/>
                <div style={{width: '100%'}}>
                    <div style={{width: '23%', float: 'left'}}>
                        {/*Module*/}
                        {this.state.course.module.map((module, moduleIndex) => {
                                if (moduleIndex === 0) {
                                    return <div/>
                                }
                                return <div key={moduleIndex.id}>
                                    <ModuleRow module={module}
                                               key={moduleIndex.id}
                                               createLesson={this.createLesson}
                                               currentModuleEdit={this.state.currentModuleEdit}
                                               setEditingModule={this.setEditingModule}
                                               deleteModule={this.deleteModule}
                                               updateModule={this.updateModule}/>
                                    {/*Lesson*/}
                                    {this.state.course.module[moduleIndex].lesson.map((lesson, lessonIndex) => {
                                            if (lessonIndex === 0) {
                                                return <div/>
                                            }
                                            return <LessonTab key={lesson.id}
                                                              lesson={lesson}
                                                              moduleIndex={moduleIndex}
                                                              lessonIndex={lessonIndex}
                                                              currentLessonEdit={this.state.currentLessonEdit}
                                                              setEditingLesson={this.setEditingLesson}
                                                              deleteLesson={this.deleteLesson}
                                                              updateLesson={this.updateLesson}
                                                              currentSelect={this.currentSelect}/>
                                        }
                                    )}
                                </div>
                            }
                        )}
                    </div>
                    <div style={{width: '75%', float: 'right'}}>
                        <div>
                            <input onChange={this.TopicBarChanged} type="text" placeholder="Topic"/>
                            <button className="btn btn-primary"
                                    onClick={() =>
                                        this.topicService.createTopic(this.state.newTopic,
                                            this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].id).then(() => {
                                            this.componentDidMount();
                                        })
                                    }>
                                Create Topic
                            </button>
                            <ul className="nav nav-tabs">

                                {(this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson]) && this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].topic.map((topic, topicIndex) => {
                                        if (this.state.currentModule !== 0) {
                                            return <TopicPills key={topic.id}
                                                               topic={topic}
                                                               topicIndex={topicIndex}
                                                               currentSelect={this.currentSelect}
                                                               deleteTopic={this.deleteTopic}
                                                               currentLesson={this.state.currentLesson}
                                                               currentModule={this.state.currentModule}/>
                                        }
                                    }
                                )}
                            </ul>
                        </div>
                        <div>
                            <Provider store={store}>
                                <Router>
                                    <Route path={"/courseEditor/" + this.props.match.params.courseId + "/:topicId"} component={WidgetListContainer}/>
                                </Router>
                            </Provider>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CourseEditor;