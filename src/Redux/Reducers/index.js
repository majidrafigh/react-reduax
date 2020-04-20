//this the root reducer to combine all reducers in the application
import { combineReducers } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducers({
  courses,
});

export default rootReducer;
