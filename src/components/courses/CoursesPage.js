import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../Redux/actions/courseActions";
import PropTypes from 'prop-types'

class CoursesPages extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  //Arrow functions inherit the binding context of their enclosing scope
  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //dispatch is available in props as we left the mapDispatch method in connect method
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          value={this.state.course.title}
          onChange={this.handleChange} //bind the this of function to the this of the class
        />
        <input type="submit" value="Save" />

        {this.props.courses.map(course=>(
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPages.propTypes = {
dispatch: PropTypes.func.isRequired,
courses:PropTypes.array.isRequired
}

//function mapStateToProps(state, ownProps) {
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

//export default connect(mapStateToProps, mapDispatchToProps)(CoursesPages);
export default connect(mapStateToProps)(CoursesPages);
