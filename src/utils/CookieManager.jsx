import Cookies from "js-cookie";

export const CookieType = Object.freeze({
  REFRESH_TOKEN: "refreshToken",
});
export class CookieManger {
  //refresh token
  static RevokeRefreshCookie() {
    Cookies.remove(CookieType.REFRESH_TOKEN);
  }
  static SetRefreshCookie(token) {
    Cookies.set(CookieType.REFRESH_TOKEN, token);
  }

  static GetRefreshCookie() {
    return Cookies.get(CookieType.REFRESH_TOKEN);
  }
}
