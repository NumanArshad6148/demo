import cookie from "js-cookie";
import { history as customHistory } from "../routes";

export type userSessionType = {
  token: string;
};

export const getUser = (): userSessionType => {
  const user = cookie.get("user") && JSON.parse(cookie.get("user") as string);
  return user;
};

export const setUser = (user: userSessionType, history: any): void => {
  cookie.set("user", JSON.stringify(user));
  history.push("/courses");
};

export const clearUser = (): void => {
  cookie.remove("user");
  customHistory.replace("/login");
};

export const isEmpty = (data: undefined | null | string | object): boolean =>
  data === undefined ||
  data === null ||
  (typeof data === "string" && data.trim().length === 0) ||
  (typeof data === "object" && Object.keys(data).length === 0);
