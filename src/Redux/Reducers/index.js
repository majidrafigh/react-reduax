//this the root reducer to combine all reducers in the application
import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer"

const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
