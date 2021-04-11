import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import DefaultLayout from "../common/layouts/DefaultLayout";
import MainLayout from "../common/layouts/main/MainLayout";
import LoginScreen from "../pages/Login";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRouter";
import { PRIVATE, RouterList } from "./Routes";
export default function AppRouter(props) {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <DefaultLayout>
              <LoginScreen />
            </DefaultLayout>
          }
        />

        <Route path="/">
          <Navigate to="/home" />
        </Route>

        {RouterList.filter((item) => item.priority === PRIVATE).map((item) => (
          <PrivateRoute key={item.id} path={item.path}>
            

            {item.child.map((child) => (
              <PrivateRoute
                key={child.id}
                layout={MainLayout}
                path={child.path}
                element={child.component}
              />
            ))}
          </PrivateRoute>
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
