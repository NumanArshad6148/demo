import {
  START_LOADING,
  STOP_LOADING,
  START_BUTTON_LOADING,
  STOP_BUTTON_LOADING,
} from "../actionTypes";
import {
  startLoadingAction,
  stopLoadingAction,
  startButtonLoadingAction,
  stopButtonLoadingAction,
} from "../../models/loading";

export const startLoading = (): startLoadingAction => ({
  type: START_LOADING,
});

export const stopLoading = (): stopLoadingAction => ({
  type: STOP_LOADING,
});
export const startButtonLoading = (): startButtonLoadingAction => ({
  type: START_BUTTON_LOADING,
});
export const stopButtonLoading = (): stopButtonLoadingAction => ({
  type: STOP_BUTTON_LOADING,
});
