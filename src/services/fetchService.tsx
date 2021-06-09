import { clearUser, getUser } from "../utils/functions";
import store from "../redux/store";
import { setError } from "../redux/errors/errros.actions";
import {
  startButtonLoading,
  startLoading,
  stopButtonLoading,
  stopLoading,
} from "../redux/loading/loading.actions";
import { trackPromise } from "react-promise-tracker";

interface params {
  method?: string;
  payload?: object;
  endPoint: string;
  listing?: boolean;
}

type returnPromise = Promise<any>;

export const trackPromiseWrapper = (payload: params, area: string) => {
  // console.log({ area });
  return trackPromise(httpService(payload), area);
};

const { dispatch } = store;
export const httpService = ({
  method = "POST",
  payload,
  endPoint,
  listing,
}: params): returnPromise => {
  const isPrivateEndPoint = !endPoint.includes("/auth/");

  dispatch((method === "GET" ? startLoading : startButtonLoading)());
  //  // "proxy": "http://localhost:4000"

  const abortController = new AbortController();
  const requestOptions = {
    method,
    signal: abortController.signal,
    headers: {
      "Content-Type": "application/json",
      ...(isPrivateEndPoint && {
        Authorization: `Bearer ${getUser()?.token}`,
      }),
    },

    ...(payload && {
      body: JSON.stringify(payload),
    }),
  };

  abortController.abort();

  return fetch(`${process.env.REACT_APP_BASE_URL}${endPoint}`, requestOptions)
    .then(async (response) => {
      const jsonResponse = await response.json();
      // console.log("headers is", response.headers.get("X-Total-Count") as any);

      if (response.status === 401) {
        clearUser();
        return Promise.reject("logout");
      } else if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(
          listing
            ? { jsonResponse, count: response.headers.get("X-Total-Count") }
            : jsonResponse
        );
      }
      dispatch(setError(jsonResponse));
      return Promise.reject(jsonResponse);
    })
    .catch((error) => Promise.reject(error))

    .finally(() =>
      dispatch((method === "GET" ? stopLoading : stopButtonLoading)())
    );
};
