import { SET_ERRORS, CLEAR_ERRORS } from "../redux/actionTypes";

export interface dynamickeyObjectType {
  [key: string]: string;
}

export interface setErrorActions {
  type: typeof SET_ERRORS;
  payload: dynamickeyObjectType;
}

export interface clearErrorActions {
  type: typeof CLEAR_ERRORS;
}

export type actionTypes = setErrorActions | clearErrorActions;

export interface stateTypes {
  all_errors: dynamickeyObjectType | null;
}
