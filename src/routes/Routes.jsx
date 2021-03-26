import IconApp from "../common/icons";
import Dashboard from "../pages/dashboards";
import AlarmScreen from "../pages/alarm";
import DeviceScreen from "../pages/devices";
import DetailScreen from "../pages/devices/detail/Details";
import PRCalculationSreen from "../pages/prcalc/index";
import TrendScreen from "../pages/trend";
import SystemInfoScreen from "../pages/system";

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
      {
        id: 2,
        path: "/home/name",
        component: Dashboard,
      },
      {
        id: 3,
        path: "/home/age",
        component: Dashboard,
      },
    ],
  },
  {
    id: 2,
    iconItem: IconApp.DEVICE,
    name: "Devices",
    path: "/device/:path?",
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
        path: "/device/detail",
        component: DetailScreen,
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
        component: PRCalculationSreen,
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
    id: 7,
    iconItem: IconApp.SIGN_OUT,
    name: "Log Out",
    linkTo: "/login",
    path: "/login",
    child: [
      {
        id: 1,
        path: "/device/detail/:index",
        component: DetailScreen,
      },
    ],
  },
];
