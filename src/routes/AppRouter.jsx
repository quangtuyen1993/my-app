

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from "../pages/Login"
import Dashboard from '../pages/dashboards';
import AlarmScreen from '../pages/alarm';
import DeviceScreen from '../pages/devices';
import DetailScreen from '../pages/devices/detail/Details';
import PRCalculationSreen from '../pages/PRCalculation';
import SystemInfoScreen from '../pages/SystemInfo';
import AppRoute from "./AppRoute"
import MainLayout from '../common/layouts/MainLayout';
import DefaultLayout from '../common/layouts/DefaultLayout';
import NotFound from "../pages/NotFound"
import TrendScreen from '../pages/Trend';

export default function AppRouter(props) {
  return (
    <Router>


      <Switch>

        {/* <DefaultLayout> */}
          <Route exact path="/login" component={LoginScreen} />
        {/* </DefaultLayout> */}


        <Route exact path='/device/:id?'>
          <Switch>
            <MainLayout>
              <Route path="/device" exact component={DeviceScreen} />
              <Route path="/device/:id" component={DetailScreen} />
            </MainLayout>
          </Switch>
        </Route>




        <Route>
          <Switch>
            <MainLayout>
              <Route exact path='/' component={Dashboard} />
              <Route path='/alarm' component={AlarmScreen} />
              <Route path='/trend' component={TrendScreen} />
              <Route path='/prcalculation' component={PRCalculationSreen} />
              <Route path='/systeminfor' component={SystemInfoScreen} />
            </MainLayout>
          </Switch>
        </Route>

        <Route path="*" exact={true} component={NotFound} />

      </Switch>

    </Router>

  )
}