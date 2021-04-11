import IconApp from "../common/icons";
import MainLayout from "../common/layouts/main/MainLayout";
import AccountScreen from "../pages/account";
import AlarmScreen from "../pages/alarm";
import Dashboard from "../pages/dashboards";
import DeviceScreen from "../pages/devices";
import DetailScreen from "../pages/devices/detail/Details";
import PowerMeterDetail from "../pages/devices/detail/PowerMeterDetail";
import PRCalculationScreen from "../pages/prcalc/index";
import SchedulerScreen from "../pages/scheduler_maintain";
import SystemInfoScreen from "../pages/system";
import TrendScreen from "../pages/trendMainScreen";
import InverterStringScreen from "../pages/strings"

export const PRIVATE = "_private_";
export const PUBLIC = "_public_";

export const RouterList = [
  {
    id: 1,
    iconItem: IconApp.DASHBOARD,
    name: "Overview",
    linkTo: "/home",
    path: "/home",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        ),
      },
    ],
  },

  {
    id: 2,
    iconItem: IconApp.DEVICE,
    name: "Devices",
    path: "/device",
    linkTo: "/device",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <DeviceScreen />
          </MainLayout>
        ),
      },
      {
        id: 3,
        path: "/power_meter",
        component: (
          <MainLayout>
            <PowerMeterDetail />
          </MainLayout>
        ),
      },
      {
        id: 2,
        path: "/inverter",
        component: (
          <MainLayout>
            <DetailScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 10,
    iconItem: IconApp.MONITOR,
    name: "Inverter Strings",
    path: "/strings",
    linkTo: "/strings",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <InverterStringScreen />
          </MainLayout>
        ),
      },
      {
        id: 3,
        path: "/power_meter",
        component: (
          <MainLayout>
            <PowerMeterDetail />
          </MainLayout>
        ),
      },
      {
        id: 2,
        path: "/inverter",
        component: (
          <MainLayout>
            <DetailScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 3,
    iconItem: IconApp.ALARM,
    name: "Alarms",
    linkTo: "/alarm",
    path: "/alarm",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <AlarmScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 4,
    iconItem: IconApp.TRENT,
    name: "Trends",
    linkTo: "/trend",
    path: "/trend",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <TrendScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 5,
    iconItem: IconApp.CALC,
    name: "PR Calculation",
    linkTo: "/prcalculation",
    path: "/prcalculation",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <PRCalculationScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 8,
    iconItem: IconApp.SCHEDULER_TASK,
    name: "Scheduler Task",
    linkTo: "/scheduler",
    path: "/scheduler",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <SchedulerScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 99,
    iconItem: IconApp.ACCOUNT,
    name: "Account Manager",
    linkTo: "/account",
    path: "/account",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <AccountScreen />
          </MainLayout>
        ),
      },
    ],
  },
  {
    id: 6,
    iconItem: IconApp.INFO,
    name: "System info",
    linkTo: "/systemInfo",
    path: "/systemInfo",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/",
        component: (
          <MainLayout>
            <SystemInfoScreen />
          </MainLayout>
        ),
      },
    ],
  },
];
