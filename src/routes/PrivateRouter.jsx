import React from "react";
import { Redirect, Route } from "react-router-dom";
import { CookieManger } from "../utils/CookieManager";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const refreshToken = CookieManger.GetRefreshCookie()
  let isCheck = refreshToken !== undefined;
  return (
    <Route
      {...rest}
      render={(props) =>
        isCheck ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
