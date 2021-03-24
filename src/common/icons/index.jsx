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
    faBroadcastTower

} from '@fortawesome/free-solid-svg-icons'

export const PUBLIC_ICON = process.env.PUBLIC_URL + "/assets/images/logoSkyXBlack.png"
export const PUBLIC_ICON_LIGHT = process.env.PUBLIC_URL + "/assets/images/logoSkyX_light.png"
export const PUBLIC_ICON_ISOLAR = process.env.PUBLIC_URL + "/assets/images/isolar_icon.png"

const IconApp = {
    POWER: faCarBattery,
    RUNNING: faChargingStation,
    ENEGRY: faAtom,
    PR: faCalculator,
    WEATHER: faCloudSun,
    POWERTREND: faCarBattery,
    BOTH: faBolt,
    RATATION: faSun,
    WIND: faWind,
    TEMP: faTemperatureHigh,
    CALENDAR: faCalendar,
    DASHBOARD: faTachometerAlt,
    DEVICE: faTabletAlt,
    ALARM: faBell,
    CACL: faCalculator,
    TRENT: faChartLine,
    INFO: faInfo,
    SIGN_OUT: faSignOutAlt,
    BROADCAST_TOWER:faBroadcastTower


}
export default IconApp