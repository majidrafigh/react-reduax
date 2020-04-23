import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
class CoursesPages extends React.Component {
  render() {
    return (
      //add a fragment to wrap the render, otherwise we will have two top level elements
      <Fragment>
        <h2>Courses</h2>
        {this.props.courses.map(course=>(
          <div key={course.title}>{course.title}</div>
        ))}
        </Fragment>
    );
  }
}

CoursesPages.propTypes = {
actions: PropTypes.object.isRequired,
courses:PropTypes.array.isRequired
}

//function mapStateToProps(state, ownProps) {
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return{
    // createCourse: course => dispatch(courseActions.createCourse(course))
    //dispatch is the method that notifies the store about a new action
    actions: bindActionCreators(courseActions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPages);