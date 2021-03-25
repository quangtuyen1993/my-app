import React from "react";
import { Redirect, Route } from "react-router-dom";
const isCheck = true;
const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => (
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
export default PrivateRoute;
