import React from 'react'
import CourseService from "../services/CourseService";
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService";
import TopicService from "../services/TopicService";
import ModuleRow from "../components/ModuleRow";
import LessonTab from "../components/LessonTab";
import TopicPills from "../components/TopicPills";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
        this.moduleService = ModuleService.instance;
        this.lessonService = LessonService.instance;
        this.topicService = TopicService.instance;
        this.state = {
            //index
            currentModule: 0,
            currentLesson: 0,
            currentTopic: 0,
            //id
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
        this.lessonService.deleteLesson(lessonId).then(() => this.componentDidMount());
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
        console.log("set select");
        this.setState({currentModule: moduleId}, {currentLesson: lessonId}, {currentTopic: topicId});
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
        if (this.state.course.module == null || this.state.course.module === undefined || this.state.course.module.length === 0) {
            this.courseService.deleteCourse(this.props.match.params.courseId);
            window.location.href = 'http://localhost:3000/whiteboard';
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
                                if (moduleIndex !== 0) {
                                    return <div key={moduleIndex}>
                                        <ModuleRow module={module}
                                                   createLesson={this.createLesson}
                                                   currentModuleEdit={this.state.currentModuleEdit}
                                                   setEditingModule={this.setEditingModule}
                                                   deleteModule={this.deleteModule}
                                                   updateModule={this.updateModule}/>
                                        {/*Lesson*/}
                                        <ul className="list-group">
                                            {this.state.course.module[moduleIndex].lesson.map((lesson, lessonIndex) => {
                                                    return <LessonTab key={lessonIndex}
                                                                      lesson={lesson}
                                                                      moduleIndex={moduleIndex}
                                                                      lessonIndex={lessonIndex}
                                                                      currentModule={this.state.currentModule}
                                                                      currentLesson={this.state.currentLesson}
                                                                      currentLessonEdit={this.state.currentLessonEdit}
                                                                      setEditingLesson={this.setEditingLesson}
                                                                      deleteLesson={this.deleteLesson}
                                                                      updateLesson={this.updateLesson}
                                                                      currentSelect={this.currentSelect}/>
                                                }
                                            )}
                                        </ul>
                                    </div>
                                }
                            }
                        )}
                    </div>
                    <div style={{width: '75%', float: 'right'}}>
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
                            {this.state.course.module[this.state.currentModule].lesson[this.state.currentLesson].topic.map((topic, topicIndex) => {
                                    if (this.state.currentModule !== 0 && topicIndex !== 0) {
                                        console.log(this.state.currentModule+"  "+this.state.currentLesson);
                                        return <TopicPills key={topicIndex}
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
                </div>
            </div>
        )
    }
}

export default CourseEditor;