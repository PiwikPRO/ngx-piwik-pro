import { CookieManagement } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

type ICookieManagement = typeof CookieManagement;

@Injectable({
  providedIn: 'root'
})
export class CookieManagementService {
  disableCookies(...params: Parameters<ICookieManagement['disableCookies']>) {
    CookieManagement.disableCookies(...params);
  }
  enableCookies(...params: Parameters<ICookieManagement['enableCookies']>) {
    CookieManagement.enableCookies(...params);
  }
  deleteCookies(...params: Parameters<ICookieManagement['deleteCookies']>) {
    CookieManagement.deleteCookies(...params);
  }
  hasCookies(...params: Parameters<ICookieManagement['hasCookies']>) {
    return CookieManagement.hasCookies(...params);
  }
  setCookieNamePrefix(...params: Parameters<ICookieManagement['setCookieNamePrefix']>) {
    CookieManagement.setCookieNamePrefix(...params);
  }
  setCookieDomain(...params: Parameters<ICookieManagement['setCookieDomain']>) {
    CookieManagement.setCookieDomain(...params);
  }
  getCookieDomain() {
    return CookieManagement.getCookieDomain();
  }
  setCookiePath(...params: Parameters<ICookieManagement['setCookiePath']>) {
    CookieManagement.setCookiePath(...params);
  }
  getCookiePath() {
    return CookieManagement.getCookiePath();
  }
  setSecureCookie(...params: Parameters<ICookieManagement['setSecureCookie']>) {
    CookieManagement.setSecureCookie(...params);
  }
  setVisitorCookieTimeout(...params: Parameters<ICookieManagement['setVisitorCookieTimeout']>) {
    CookieManagement.setVisitorCookieTimeout(...params);
  }
  getConfigVisitorCookieTimeout() {
    return CookieManagement.getConfigVisitorCookieTimeout();
  }
  setSessionCookieTimeout(...params: Parameters<ICookieManagement['setSessionCookieTimeout']>) {
    CookieManagement.setSessionCookieTimeout(...params);
  }
  getSessionCookieTimeout() {
    return CookieManagement.getSessionCookieTimeout();
  }
  setReferralCookieTimeout(...params: Parameters<ICookieManagement['setReferralCookieTimeout']>) {
    CookieManagement.setReferralCookieTimeout(...params);
  }
  setVisitorIdCookie(...params: Parameters<ICookieManagement['setVisitorIdCookie']>) {
    CookieManagement.setVisitorIdCookie(...params);
  }
}
