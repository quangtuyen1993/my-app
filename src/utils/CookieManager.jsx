import Cookies from "js-cookie";
export const CookieType = Object.freeze({
  REFRESH_TOKEN: "refreshToken",
  CURRENT_STATION: "currentStation",
  JWT_TOKEN: "accessToken",
  CURRENT_DEVICES: "deviceCurrent",
  CURRENT_DEVICES_POWER_METER: "device_power_meter_Current",
});

export class CookieManger {
  //refresh token
  static RevokeRefreshCookie() {
    Cookies.remove(CookieType.REFRESH_TOKEN);
  }
  static SetRefreshCookie(token, expires) {
    Cookies.set(CookieType.REFRESH_TOKEN, token, {
      expires: new Date(expires),
    });
  }

  static GetRefreshCookie() {
    return Cookies.get(CookieType.REFRESH_TOKEN);
  }

  static GetStationCurrent() {
    return Cookies.get(CookieType.CURRENT_STATION);
  }
  static SetStationCurrent(station) {
    Cookies.set(CookieType.CURRENT_STATION, station, {
      expires: new Date(Date.now() + 24 * 1000 * 60 * 60),
    });
  }
  static RevokeStationCurrent() {
    Cookies.remove(CookieType.CURRENT_STATION);
  }

  static setJWTToken(jwtToken) {
    Cookies.set(CookieType.JWT_TOKEN, jwtToken);
  }

  static getJWTToken() {
    Cookies.get(CookieType.JWT_TOKEN);
  }

  static getCurrentDevice() {
    return Cookies.get(CookieType.CURRENT_DEVICES);
  }

  static setCurrentDevice(currentDevice) {
    Cookies.set(CookieType.CURRENT_DEVICES, currentDevice);
  }
  static revokeCurrentDevice() {
    Cookies.remove(CookieType.CURRENT_DEVICES);
  }
  
  static getCurrentDevicePowerMeter() {
    return Cookies.get(CookieType.CURRENT_DEVICES_POWER_METER);
  }

  static setCurrentDevicePowerMeter(currentDevice) {
    Cookies.set(CookieType.CURRENT_DEVICES_POWER_METER, currentDevice);
  }
  static revokeCurrentDevicePowerMeter() {
    Cookies.remove(CookieType.CURRENT_DEVICES_POWER_METER);
  }
  static RevokeAllCookies() {
    this.RevokeStationCurrent();
    this.RevokeRefreshCookie();
  }
}
