import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";

function ManageCoursePages({ courses, authors, loadAuthors, loadCourses }) {
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
  },[]);//without the second argument this method gets called on each render.
  //
  return (
    <>
      <h2>Manage Course</h2>
    </>
  );
}

ManageCoursePages.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses, //we can use named imports to make this shorter (check load authors)
  loadAuthors, //confusion: we have two variables with the same name in this fie, the import and the action
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePages);
