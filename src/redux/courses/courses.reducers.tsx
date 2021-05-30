import { GET_ALL_COURSES, DELETE_COURSE } from "../actionTypes";
import { actionTypes, stateTypes, courseListType } from "../../models/courses";

const initialState: stateTypes = {
  all_courses: null,
  count: 0,
};

export default function (
  state = initialState,
  action: actionTypes
): stateTypes {
  switch (action.type) {
    case GET_ALL_COURSES:
      return { all_courses: action.payload, count: action.count };
    case DELETE_COURSE:
      const allCourses = state.all_courses as courseListType;
      return {
        all_courses: allCourses.filter(({ id }) => id !== action.id),
        count: state.count - 1,
      };
    default:
      return state;
  }
}
