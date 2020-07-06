import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth/Context";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        authTokens != null ? (
          <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )} 
    />
  )
}

export default AuthenticatedRoute;