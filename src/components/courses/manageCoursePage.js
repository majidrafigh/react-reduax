import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {loadCourses, saveCourse} from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePages({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  //allows to have access to the rest of objects in props
  const [course, setCourse] = useState({ ...props.course }); //here we use useState instead of Redux to hold a state. Avoid using Redux for all state, use plain react state for data only one few components use: Ask who cares about this data
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed:" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed:" + error);
      });
    }
  }, []); //without the second argument this method gets called on each render.

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value, //js computed property: reference property using variable
    }));
  }

function handleSave(event) {
  event.preventDefault();
  saveCourse(course).then(() => {
    debugger;
    history.push("/courses");
  });
}

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePages.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,

    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  saveCourse,
  loadAuthors
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePages);
