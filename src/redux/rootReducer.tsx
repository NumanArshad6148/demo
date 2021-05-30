import { combineReducers } from "redux";
import errorsReducer from "./errors/errors.reducers";
import coursesReducer from "./courses/courses.reducers";
import authorsReducer from "./authors/authors.reducers";
import loadingReducer from "./loading/loading.reducers";

const rootReducer = combineReducers({
  courses: coursesReducer,
  authors: authorsReducer,
  errors: errorsReducer,
  loading: loadingReducer,
});

export default rootReducer;
