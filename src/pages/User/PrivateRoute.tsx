import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: FunctionComponent,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <FunctionComponent {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
