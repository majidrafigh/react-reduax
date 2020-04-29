import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsWithSuccess(actionType) {
  const suffix = "_SUCCESS";
  return actionType.substring(actionType.length - suffix.length) === suffix;
}

export default function authorReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type == types.BEGIN_API_CALL) return state + 1;
  else if (actionTypeEndsWithSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
