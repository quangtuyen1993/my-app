import {
  faCarBattery,
  faChargingStation,
  faAtom,
  faBolt,
  faCalculator,
  faCloudSun,
  faSun,
  faWind,
  faTemperatureHigh,
  faCalendar,
  faTachometerAlt,
  faTabletAlt,
  faBell,
  faChartLine,
  faInfo,
  faSignOutAlt,
  faBroadcastTower,
  faChartBar,
  faBinoculars,
  faRadiationAlt,
  faInfoCircle,
  faArrowCircleDown,
  faChevronDown,
  faAddressCard,
  faCogs,
  faUserCog,
  faUserMinus,
  faCog,
  faKey,
  faPersonBooth,
  faUsers,
  faClock,
  faFileCsv,
  faArrowAltCircleDown,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
  faCarBattery,
  faChargingStation,
  faAtom,
  faBolt,
  faCalculator,
  faCloudSun,
  faSun,
  faWind,
  faTemperatureHigh,
  faCalendar,
  faTachometerAlt,
  faTabletAlt,
  faBell,
  faChartLine,
  faInfo,
  faSignOutAlt,
  faInfoCircle,
  faBroadcastTower,
  faChartLine,
  faRadiationAlt,
  faCalendar,
  faArrowCircleDown,
  faChevronDown,
  faAddressCard,
  faUserCog,
  faUserMinus,
  faCogs,
  faKey,
  faUsers,
  faClock,
  faFileCsv,
  faArrowAltCircleDown,
  faSync
);

export const PUBLIC_ICON =
  process.env.PUBLIC_URL + "/assets/images/logoSkyXBlack.png";
export const PUBLIC_ICON_LIGHT =
  process.env.PUBLIC_URL + "/assets/images/logoSkyX_light.png";
export const PUBLIC_ICON_ISOLAR =
  process.env.PUBLIC_URL + "/assets/images/isolar_icon.png";

const IconApp = {
  POWER: faCarBattery,
  RUNNING: faChargingStation,
  ENERGY: faAtom,
  PR: faCalculator,
  WEATHER: faCloudSun,
  POWER_TREND: ["fas", "atom"],
  BOTH: ["fas", "bolt"],
  RADIATION: faSun,
  WIND: faWind,
  TEMP: faTemperatureHigh,
  CALENDAR: faCalendar,
  DASHBOARD: faTachometerAlt,
  DEVICE: faTabletAlt,
  ALARM: faBell,
  CALC: faCalculator,
  TRENT: faChartLine,
  INFO: faInfoCircle,
  SIGN_OUT: faSignOutAlt,
  BROADCAST_TOWER: faBroadcastTower,
  SCHEDULER_TASK: faCalendar,
  RATIO: faRadiationAlt,
  TREND_24_HOURS: faChartBar,
  TABLE: faBinoculars,
  ARROW_DOWN: faChevronDown,
  ACCOUNT: faAddressCard,
  UPDATE: faUserCog,
  REMOVE: faUserMinus,
  CONFIG: faCogs,
  SECURITY: faKey,
  PERSON: faPersonBooth,
  USERS: faUsers,
  CLOCK: faClock,
  DOWNLOAD:faArrowAltCircleDown,
  CSV:  faFileCsv,
  SYNC:faSync

};
export default IconApp;