import React from "react";
class CoursesPages extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  //All of below are gone with the class fields
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     course: {
  //       title: "",
  //     },
  //   };

  //   //this.handleChange = this.handleChange.bind(this); //Constructor binding is better than inline binding
  //   //which reduces the number of functions being created as result of multiple renders
  //   //we won't re-allocate on each render
  // }

  //Arrow functions inherit the binding context of their enclosing scope
  handleChange = (event) => {
    //class field function: handles binding as well
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course }); // this.setState({ course: course }); object short hand syntax
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(this.state.course.title);
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
      </form>
    );
  }
}

export default CoursesPages;
