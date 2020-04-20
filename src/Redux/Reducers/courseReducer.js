export default function courseReducer(state = [], action) {
  switch (action.type) {
    case "CREATE_COURSE":
      //state.push(action.course);//NO this is not immutable
      return [...state, { ...action.course }];
    default:
      //always use a default in reducers to return state untouched
      return state;
  }
}
