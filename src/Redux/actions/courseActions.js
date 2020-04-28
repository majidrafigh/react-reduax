import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import {beginApiCall} from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCoursesSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCoursesSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

//first thunk, put thunks in the bottom of the actions
//every thunk returns a function that accepts a dispatch
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    //dispatch is injected by thunk middleware
    return courseApi
      .getCourses()
      .then((coursesFromApi) => {
        dispatch(loadCoursesSuccess(coursesFromApi));        
        //dispatch({ type: types.LOAD_COURSES_SUCCESS, coursesFromApi });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
        ? dispatch(updateCoursesSuccess(savedCourse))
        : dispatch(createCoursesSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
