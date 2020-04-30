import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch((error) => {
                alert("Loading courses failed:" + error);
            });
        } else {
            setCourse({ ...props.course });
        }

        if (authors.length === 0) {
            loadAuthors().catch((error) => {
                alert("Loading authors failed:" + error);
            });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value, //js computed property: reference property using variable
        }));
    }

    function formIsValid() {
        const { title, authorId, category } = course;
        const errors = {};

        if (!title) errors.title = "Title is requires";
        if (!authorId) errors.author = "Author is requires";
        if (!category) errors.category = "Category is requires";

        setErrors(errors);

        //Form is valid if the errors object still has no properties
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course).then(() => {
            toast.success("Course " + course.name + " saved");
            history.push("/courses");
        });
        //no need to set saving to false as we navigate to the main page
    }

    return authors.length === 0 || courses.length === 0 ? (
        <Spinner />
    ) : (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
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

//function like this are called selectors as it selects something from state
//this could be in reducer if we need to have access to it in other places
// also for performance it can be memoize with libraries : reselect
function getCourseBySlug(courses, slug) {
    return courses.find((c) => c.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course =
        slug && state.courses.length > 0 //the API call is async and courses might be empty
            ? getCourseBySlug(state.courses, slug)
            : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors,
    };
}

const mapDispatchToProps = {
    loadCourses,
    saveCourse,
    loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePages);
