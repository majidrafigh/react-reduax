import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

//Note how witch shallow render we search for the React Component tag
it("Contains 3 NavLinks via shallow", () => {
    const numberOfLinks = shallow(<Header />).find("NavLink").length;
    expect(numberOfLinks).toEqual(3);
});

//Note how witch mount we search for the final HTML since it generates the final DOM.
//We also need to pull in React Router's MemomoryRouter for testing since the Header expects to have React's props passed in.

it("Contains 3 NavLinks via mount", () => {
    const numberOfAnchors = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).find("a").length;
    expect(numberOfAnchors).toEqual(3);
});
