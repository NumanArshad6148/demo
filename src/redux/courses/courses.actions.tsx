import { httpService } from "../../services/fetchService";
import { GET_ALL_COURSES, DELETE_COURSE } from "../actionTypes";
import { Dispatch } from "redux";
import { History } from "history";
import { deleteCourseAction, getAllCoursesAction } from "../../models/courses";
import { toast } from "react-toastify";

const endPoint = "/api/courses";
export const getAllCourses =
  (params?: string) => (dispatch: Dispatch<getAllCoursesAction>) => {
    httpService({
      method: "GET",
      endPoint: `${endPoint}${params ?? ""}`,
      listing: true,
    }).then((response) => {
      dispatch({
        type: GET_ALL_COURSES,
        payload: response.jsonResponse,
        count: response.count,
      });
    });
  };

export const createCourse = (payload: object, history: History) => {
  httpService({ payload, endPoint }).then(() => {
    toast.success("Course Created successfully!");
    history.push("/courses");
  });
};

export const updateCourse = (id: string, payload: object, history: History) => {
  httpService({
    method: "PUT",
    endPoint: `${endPoint}/${id}`,
    payload,
  }).then(() => {
    toast.success("Course Updated successfully!");

    history.push("/courses");
  });
};

export const getSingleCourse = (courseId: string, callBack: any) => {
  httpService({
    method: "GET",
    endPoint: `${endPoint}/${courseId}`,
  }).then(callBack);
};

export const deleteCourse =
  (id: number) => (dispatch: Dispatch<deleteCourseAction>) => {
    httpService({
      method: "DELETE",
      endPoint: `${endPoint}/${id}`,
    }).then(() => {
      toast.success("Course Deleted successfully!");

      dispatch({
        type: DELETE_COURSE,
        id,
      });
    });
  };

// export function fetchSomethingRequest() {
//   return {
//     type: "FETCH_SOMETHING_REQUEST",
//   };
// }

// export function fetchSomethingSuccess(body) {
//   return {
//     type: "FETCH_SOMETHING_SUCCESS",
//     body: body,
//   };
// }

// export function fetchSomethingFailure(err) {
//   return {
//     type: "FETCH_SOMETHING_FAILURE",
//     err,
//   };
// }

// export function fetchSomething() {
//   return function (dispatch) {
//     dispatch(fetchSomethingRequest());
//     return fetchSomething("http://example.com/")
//       .then(function (response) {
//         if (response.status !== 200) {
//           throw new Error("Bad response from server");
//         } else {
//           dispatch(fetchSomethingSuccess(response));
//         }
//       })
//       .catch(function (reason) {
//         dispatch(fetchSomethingFailure(reason));
//       });
//   };
// }
