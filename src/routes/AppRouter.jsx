import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import LoginScreen from "../pages/Login";
import MainLayout from "../common/layouts/main/MainLayout";
import DefaultLayout from "../common/layouts/DefaultLayout";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRouter";
import { PRIVATE, RouterList } from "./Routes";
export default function AppRouter(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <DefaultLayout>
            <Route exact path="/login" component={LoginScreen} />
          </DefaultLayout>
        </Route>

        
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>


        {RouterList.filter((item) => item.priority === PRIVATE).map((item) => (
          <Route exact key={item.id} path={item.path}>
            {item.child.map((child) => (
              <PrivateRoute
                exact
                layout={MainLayout}
                path={child.path}
                component={child.component}
              />
            ))}
          </Route>
        ))}
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
