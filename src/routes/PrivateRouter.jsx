import React from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { CookieManger } from "../utils/CookieManager";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const refreshToken = CookieManger.GetRefreshCookie();
  const navigate = useNavigate();
  let isCheck = refreshToken !== undefined;
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        isCheck ? (
          <Component {...props} navigate={navigate} location={location} />
        ) : (
          navigate("login")
        )
      }
    />
  );
};
export default PrivateRoute;
