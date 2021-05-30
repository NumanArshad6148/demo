import { GET_ALL_COURSES, DELETE_COURSE } from "../redux/actionTypes";

export type course = {
  id: number;
  title: string;
  slug?: string;
  authorId: number;
  category: string;
};

export type courseListType = course[];

export interface getAllCoursesAction {
  type: typeof GET_ALL_COURSES;
  payload: courseListType;
  count: number;
}

export interface deleteCourseAction {
  type: typeof DELETE_COURSE;
  id: number;
}

export type actionTypes = getAllCoursesAction | deleteCourseAction;

export interface stateTypes {
  all_courses: courseListType | null;
  count: number;
}
