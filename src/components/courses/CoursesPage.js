import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./courseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPages extends React.Component {
    state = {
        redirectToAddCoursePage: false,
    };

    componentDidMount() {
        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch((error) => {
                alert("Loading courses failed:" + error);
            });
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch((error) => {
                alert("Loading authors failed:" + error);
            });
        }
    }

    handleDeleteCourse = async (course) => {
        toast.success("Course deleted");
        try {
            await this.props.actions.deleteCourse(course);
        } catch (error) {
            toast.error("Delete failed. " + error.message, {
                autoClose: false,
            });
        }
    };

    render() {
        return (
            //add a fragment to wrap the render, otherwise we will have two top level elements
            <Fragment>
                {this.state.redirectToAddCoursePage && (
                    <Redirect to="/course" />
                )}
                <h2>Courses</h2>

                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <>
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() =>
                                this.setState({ redirectToAddCoursePage: true })
                            }
                        >
                            Add Course
                        </button>
                        <CourseList
                            courses={this.props.courses}
                            onDeleteClick={this.handleDeleteCourse}
                        />
                    </>
                )}
            </Fragment>
        );
    }
}

CoursesPages.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

//function mapStateToProps(state, ownProps) {
function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0
                ? [] //as we read authors and courses async, so we don't know if authors are ready, so we return an empty array
                : state.courses.map((course) => {
                      return {
                          ...course,
                          authorName: state.authors.find(
                              (a) => a.id === course.authorId
                          ).name,
                      };
                  }),
        authors: state.authors,
        loading: state.apiCallInProgress > 0,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // createCourse: course => dispatch(courseActions.createCourse(course))
        //dispatch is the method that notifies the store about a new action
        actions: {
            loadCourses: bindActionCreators(
                courseActions.loadCourses,
                dispatch
            ),
            loadAuthors: bindActionCreators(
                authorActions.loadAuthors,
                dispatch
            ),
            deleteCourse: bindActionCreators(
                courseActions.deleteCourseOptimistic,
                dispatch
            ),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPages);
