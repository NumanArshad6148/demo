import React from "react";

const HOC = (Component) => {
  return function (props) {
    console.log({ props });
    return (
      <div>
        pretty nice
        {props.name ? <Component {...props} /> : `not passed`}
      </div>
    );
  };
};

export default HOC;
