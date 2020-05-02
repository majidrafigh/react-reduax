import React from "react";
import CourseForm from "./CourseForm";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

//have a simple factory class in top to create the default object
//a builder pattern helps a lot here
function CourseFormBuilder(args) {
    const defaultProps = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {},
    };

    const props = { ...defaultProps, ...args };
    return <CourseForm {...props} />;
}

it("renders form and header", () => {
    //React render return an object with several built in helper functions, we can use js re-destructuring to access the method, like getByText
    const { getByText } = render(CourseFormBuilder());
    getByText("Add Course");
});

//Less precise bu less work: trade off?!
it('labels save buttons as "Save" when not saving', () => {
    const { getByText } = render(CourseFormBuilder({ saving: false }));
    getByText("Save");
});

it('labels save button as "Saving..." when saving', () => {
    const { getByText, debug } = render(CourseFormBuilder({ saving: true }));
    debug();
    getByText("Saving...");
});
