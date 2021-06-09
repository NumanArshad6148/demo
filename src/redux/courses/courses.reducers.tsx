import {
  GET_ALL_COURSES,
  DELETE_COURSE,
  GET_COURSE_AUTHOR,
} from "../actionTypes";
import { actionTypes, stateTypes, courseListType } from "../../models/courses";

const initialState: stateTypes = {
  all_courses: null,
  count: 0,
  all_course_author: null,
};

export default function (
  state = initialState,
  action: actionTypes
): stateTypes {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {
        //  all_course_author: state.all_course_author,
        ...state,
        all_courses: action.payload,
        count: action.count,
      };
    case GET_COURSE_AUTHOR:
      let courseAuthor: any = {};
      courseAuthor[action.listingType] = action.payload;
      return {
        ...state,
        all_course_author: { ...state.all_course_author, ...courseAuthor },
      };
    // console.log("reducer", state, courseAuthor);
    // return Object.assign({}, state, courseAuthor);
    case DELETE_COURSE:
      const allCourses = state.all_courses as courseListType;
      return {
        ...state,
        all_courses: allCourses.filter(({ id }) => id !== action.id),
        count: state.count - 1,
      };
    default:
      return state;
  }
}
