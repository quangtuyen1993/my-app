import IconApp from "../common/icons";
import AlarmScreen from "../pages/alarm";
import Dashboard from "../pages/dashboards";
import DeviceScreen from "../pages/devices";
import DetailScreen from "../pages/devices/detail/Details";
import PowerMeterDetail from "../pages/devices/detail/PowerMeterDetail";
import PRCalculationScreen from "../pages/prcalc/index";
import SchedulerScreen from "../pages/scheduler_maintain";
import SystemInfoScreen from "../pages/system";
import TrendScreen from "../pages/trend";

export const PRIVATE = "_private_";
export const PUBLIC = "_public_";

export const RouterList = [
  {
    id: 1,
    iconItem: IconApp.DASHBOARD,
    name: "Overview",
    linkTo: "/home",
    path: "/home:path?",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/home",
        component: Dashboard,
      },
    ],
  },
  {
    id: 2,
    iconItem: IconApp.DEVICE,
    name: "Devices",
    path: "/device/:path?/:path?",
    linkTo: "/device",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/device",
        component: DeviceScreen,
      },
      {
        id: 2,
        path: "/device/inverter/:index?",
        component: DetailScreen,
      },
      {
        id: 3,
        path: "/device/power_meter/:index",
        component: PowerMeterDetail,
      },
    ],
  },
  {
    id: 3,
    iconItem: IconApp.ALARM,
    name: "Alarms",
    linkTo: "/alarm",
    path: "/alarm/:path?",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/alarm",
        component: AlarmScreen,
      },
    ],
  },
  {
    id: 4,
    iconItem: IconApp.TRENT,
    name: "Alarms",
    linkTo: "/trend",
    path: "/trend/:path?",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/trend",
        component: TrendScreen,
      },
    ],
  },
  {
    id: 5,
    iconItem: IconApp.CALC,
    name: "PR Calculation",
    linkTo: "/prcalculation",
    path: "/prcalculation/:path?",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/prcalculation",
        component: PRCalculationScreen,
      },
    ],
  },
  {
    id: 6,
    iconItem: IconApp.INFO,
    name: "System info",
    linkTo: "/systeminfor",
    path: "/systeminfor/:path?",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/systeminfor",
        component: SystemInfoScreen,
      },
    ],
  },
  {
    id: 8,
    iconItem: IconApp.INFO,
    name: "System info",
    linkTo: "/scheduler",
    path: "/scheduler/:path?",
    priority: PRIVATE,
    child: [
      {
        id: 1,
        path: "/scheduler",
        component: SchedulerScreen,
      },
    ],
  },
];
