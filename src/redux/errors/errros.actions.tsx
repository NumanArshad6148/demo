import { SET_ERRORS, CLEAR_ERRORS } from "../actionTypes";
import {
  setErrorActions,
  clearErrorActions,
  dynamickeyObjectType,
} from "../../models/errors";

export const setError = (error: dynamickeyObjectType): setErrorActions => ({
  type: SET_ERRORS,
  payload: error,
});

export const clearError = (): clearErrorActions => ({
  type: CLEAR_ERRORS,
});
