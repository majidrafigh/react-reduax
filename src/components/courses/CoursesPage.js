import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./courseList";

class CoursesPages extends React.Component {
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

  render() {
    return (
      //add a fragment to wrap the render, otherwise we will have two top level elements
      <Fragment>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </Fragment>
    );
  }
}

CoursesPages.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
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
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    //dispatch is the method that notifies the store about a new action
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPages);
