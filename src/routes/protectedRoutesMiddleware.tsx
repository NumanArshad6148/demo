import React, { Profiler } from "react";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "../utils/functions";

const ProtectedRoutes: React.FC<any> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return getUser() ? (
          // <Profiler id="text" onRender={() => console.log("rerender")}>
          <Component {...props} />
        ) : (
          // </Profiler>
          <Redirect to={{ pathname: "/login", state: { ...props.location } }} />
        );
      }}
    />
  );
};

export default ProtectedRoutes;
