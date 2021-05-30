import {
  START_LOADING,
  STOP_LOADING,
  START_BUTTON_LOADING,
  STOP_BUTTON_LOADING,
} from "../redux/actionTypes";

export interface startLoadingAction {
  type: typeof START_LOADING;
}

export interface stopLoadingAction {
  type: typeof STOP_LOADING;
}

export interface startButtonLoadingAction {
  type: typeof START_BUTTON_LOADING;
}

export interface stopButtonLoadingAction {
  type: typeof STOP_BUTTON_LOADING;
}

export type actionTypes =
  | startLoadingAction
  | stopLoadingAction
  | startButtonLoadingAction
  | stopButtonLoadingAction;

export interface stateTypes {
  loading: boolean;
  button_loading: boolean;
}
