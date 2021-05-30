import { GET_ALL_AUTHORS } from "../redux/actionTypes";

export type author = {
  id: number;
  name: string;
};

export type authorListType = author[];

export interface getAllAuthorActions {
  type: typeof GET_ALL_AUTHORS;
  payload: authorListType;
}

// export interface deleteCourseAction {
//   type: typeof DELETE_COURSE;
//   id: number;
// }

export type actionTypes = getAllAuthorActions;

export interface stateTypes {
  all_authors: authorListType | null;
}
