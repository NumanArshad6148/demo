import { Dispatch } from "react";
import { getAllAuthorActions } from "../../models/authors";
import { httpService } from "../../services/fetchService";
import { GET_ALL_AUTHORS } from "../actionTypes";

export const getAllAuthors =
  () => (dispatch: Dispatch<getAllAuthorActions>) => {
    httpService({ method: "GET", endPoint: "/api/authors" }).then((payload) =>
      dispatch({
        type: GET_ALL_AUTHORS,
        payload,
      })
    );
    // fetch(`${process.env.REACT_APP_BASE_URL}/authors`).then(async (response) => {
    //   const payload = await response.json();

    //   if (response.status === 401) {
    //     clearUser();
    //   }

    //   console.log({ payload });
    //   dispatch({
    //     type: GET_ALL_AUTHORS,
    //     payload,
    //   });
    // });
  };
