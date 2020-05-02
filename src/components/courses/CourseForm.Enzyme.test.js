import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

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
    const courseForm = shallow(CourseFormBuilder());
    //console.log(courseForm.debug());
    expect(courseForm.find("form").length).toBe(1);
    expect(courseForm.find("h2").text()).toEqual("Add Course");
});

it('labels save buttons as "Save" when not saving', () => {
    const courseForm = shallow(CourseFormBuilder({ saving: false }));
    expect(courseForm.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
    const courseForm = shallow(CourseFormBuilder({ saving: true }));
    expect(courseForm.find("button").text()).toBe("Saving...");
});
