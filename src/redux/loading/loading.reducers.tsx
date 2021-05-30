import {
  START_LOADING,
  STOP_LOADING,
  START_BUTTON_LOADING,
  STOP_BUTTON_LOADING,
} from "../actionTypes";
import { actionTypes, stateTypes } from "../../models/loading";

const initialState: stateTypes = {
  loading: false,
  button_loading: false,
};

export default function (
  state = initialState,
  action: actionTypes
): stateTypes {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case START_BUTTON_LOADING:
      return {
        ...state,
        button_loading: true,
      };
    case STOP_BUTTON_LOADING:
      console.log("stop me");
      return {
        ...state,
        button_loading: false,
      };
    default:
      return state;
  }
}
