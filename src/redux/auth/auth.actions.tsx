import { httpService, trackPromiseWrapper } from "../../services/fetchService";
import { LoginTrack } from "../../utils/constants";
import { setUser } from "../../utils/functions";
import { userSessionType } from "../../utils/functions";

export const login = (payload: object, history: any) => {
  trackPromiseWrapper({ payload, endPoint: "/auth/login" }, LoginTrack)
    .then((response) => setUser(response as userSessionType, history))
    .catch((err) => {
      console.log("error occure is", err);
    });

  // fetch(`${process.env.REACT_APP_BASE_URL + "/auth/login"}`, requestOptions)
  //   .then(async (response) => {
  //     const jsonResponse = await response.json();

  //     if (response.status === 200) {
  //       console.log({ jsonResponse });
  //       setUser(jsonResponse, history);

  //       return;
  //     }

  //     dispatch(setError(jsonResponse));
  //   })

  //   .catch((err) => {
  //     console.log("error occure is", err);
  //     //   throw err;
  //   });
};
