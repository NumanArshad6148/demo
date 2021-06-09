import { string } from "yup/lib/locale";
import {
  GET_ALL_COURSES,
  DELETE_COURSE,
  GET_COURSE_AUTHOR,
} from "../redux/actionTypes";

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

export interface getAllCourseAuthorAction {
  type: typeof GET_COURSE_AUTHOR;
  listingType: string;
  payload: any[];
}

export type actionTypes =
  | getAllCoursesAction
  | deleteCourseAction
  | getAllCourseAuthorAction;

export interface stateTypes {
  all_courses: courseListType | null;
  count: number;
  all_course_author: any;
}
