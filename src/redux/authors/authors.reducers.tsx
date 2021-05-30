import { GET_ALL_AUTHORS, DELETE_AUTHOR } from "../actionTypes";
import { stateTypes, actionTypes } from "../../models/authors";

const initialState: stateTypes = {
  all_authors: null,
};

export default function (
  state = initialState,
  action: actionTypes
): stateTypes {
  switch (action.type) {
    case GET_ALL_AUTHORS:
      return { all_authors: action.payload };
    // case DELETE_AUTHOR:
    //   return {
    //     all_authors: state.all_authors.filter(({ id }) => id !== action.id),
    //   };
    default:
      return state;
  }
}
