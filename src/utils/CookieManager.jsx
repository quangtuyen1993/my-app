import id from "date-fns/locale/id";
import Cookies from "js-cookie";

export const CookieType = Object.freeze({
  REFRESH_TOKEN: "refreshToken",
  CURRENT_STATION: "currentStation",
  JWT_TOKEN: "accessToken",

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
      expires: new Date((Date.now() + (24 * 1000 * 60 * 60))),
    });
  }
  static RevokeStationCurrent(){
    Cookies.remove(CookieType.CURRENT_STATION)
  }

  static setJWTToken(jwtToken){
    Cookies.set(CookieType.JWT_TOKEN, jwtToken);
  }

  static getJWTToken(){
    Cookies.get(CookieType.JWT_TOKEN)
  }

  static RevokeAllCookies(){
    this.RevokeStationCurrent()
    this.RevokeRefreshCookie()
  }
}
