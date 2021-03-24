

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from "../pages/Login"
import Dashboard from '../pages/dashboards';
import AlarmScreen from '../pages/alarm';
import DeviceScreen from '../pages/devices';
import DetailScreen from '../pages/devices/detail/Details';
import PRCalculationSreen from '../pages/prcalc/index';
import SystemInfoScreen from '../pages/system';
import MainLayout from '../common/layouts/MainLayout';
import DefaultLayout from '../common/layouts/DefaultLayout';
import NotFound from "../pages/NotFound"
import TrendScreen from '../pages/trend';
import PrivateRoute from './PrivateRouter';




const routers = [
  {}
]




export default function AppRouter(props) {
  return (
    <Router>


      <Switch>

        <Route exact path="/login">
          <DefaultLayout>
            <Route exact path="/login" component={LoginScreen} />
          </DefaultLayout>
        </Route>



        <Route exact path='/admin/device/:id?'>
          <Switch>
            <MainLayout>
              <PrivateRoute path="/admin/device" exact component={DeviceScreen} />
              <PrivateRoute path="/admin/device/:id" component={DetailScreen} />
            </MainLayout>
          </Switch>
        </Route>

        <Route path="/admin/" exact>
          <MainLayout>
            <PrivateRoute exact path='/admin' component={Dashboard} />
          </MainLayout>
        </Route>

        <Route path="/admin/alarm" exact>
          <MainLayout>
            <PrivateRoute path='/admin/alarm' component={AlarmScreen} />
          </MainLayout>
        </Route>

        <Route path="/admin/trend" exact>
          <MainLayout>
            <PrivateRoute path='/admin/trend' component={TrendScreen} />
          </MainLayout>
        </Route>

        <Route path="/admin/prcalculation" exact>
          <MainLayout>
            <PrivateRoute path='/admin/prcalculation' component={PRCalculationSreen} />
          </MainLayout>
        </Route>

        <Route path="/admin/systeminfor" exact>
          <MainLayout>
            <PrivateRoute path='/admin/systeminfor' component={SystemInfoScreen} />
          </MainLayout>
        </Route>



        <Route path="*" component={NotFound} />

      </Switch>
    </Router>

  )
}