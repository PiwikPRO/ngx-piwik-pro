import { CookieManagement } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieManagementService {

  disableCookies() {
    CookieManagement.disableCookies();
  }

  enableCookies() {
    CookieManagement.enableCookies();
  }

  deleteCookies() {
    CookieManagement.deleteCookies();
  }

  hasCookies(): Promise<boolean> {
    return CookieManagement.hasCookies();
  }

  setCookieNamePrefix(prefix: string) {
    CookieManagement.setCookieNamePrefix(prefix);
  }

  setCookieDomain(domain: string) {
    CookieManagement.setCookieDomain(domain);
  }

  setCookiePath(path: string) {
    CookieManagement.setCookiePath(path);
  }

  setSecureCookie(secure: boolean) {
    CookieManagement.setSecureCookie(secure);
  }

  setVisitorCookieTimeout(seconds: number) {
    CookieManagement.setVisitorCookieTimeout(seconds);
  }

  setSessionCookieTimeout(seconds: number) {
    CookieManagement.setSessionCookieTimeout(seconds);
  }

  setVisitorIdCookie() {
    CookieManagement.setVisitorIdCookie();
  }
}
