import { SET_ERRORS, CLEAR_ERRORS } from "../actionTypes";
import { actionTypes, stateTypes } from "../../models/errors";

const initialState: stateTypes = {
  all_errors: null,
};

export default function (
  state = initialState,
  action: actionTypes
): stateTypes {
  switch (action.type) {
    case SET_ERRORS:
      return {
        all_errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        all_errors: null,
      };
    default:
      return state;
  }
}
