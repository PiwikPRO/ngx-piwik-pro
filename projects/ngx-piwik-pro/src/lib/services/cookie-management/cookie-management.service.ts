import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class CookieManagementService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  disableCookies() {
    this.paqService.push([TRACK_EVENT.DISABLE_COOKIES]);

  }

  enableCookies() {
    this.paqService.push([TRACK_EVENT.ENABLE_COOKIES]);

  }

  deleteCookies() {
    this.paqService.push([TRACK_EVENT.DELETE_COOKIES]);

  }

  hasCookies(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any) {
            resolve(this.hasCookies());
          },
        ]);
      } catch (e) {
        if (e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }

  setCookieNamePrefix(prefix: string) {
    this.paqService.push([TRACK_EVENT.SET_COOKIE_NAME_PREFIX, prefix]);

  }

  setCookieDomain(domain: string) {
    this.paqService.push([TRACK_EVENT.SET_COOKIE_DOMAIN, domain]);
  }

  setCookiePath(path: string) {
    this.paqService.push([TRACK_EVENT.SET_COOKIE_PATH, path]);
  }

  setSecureCookie(secure: boolean) {
    this.paqService.push([TRACK_EVENT.SET_SECURE_COOKIE, secure]);
  }

  setVisitorCookieTimeout(seconds: number) {
    this.paqService.push([TRACK_EVENT.SET_VISITOR_COOKIE_TIMEOUT, seconds]);
  }

  setSessionCookieTimeout(seconds: number) {
    this.paqService.push([TRACK_EVENT.SET_SESSION_COOKIE_TIMEOUT, seconds]);
  }

  setVisitorIdCookie(){
    this.paqService.push([TRACK_EVENT.SET_VISITOR_ID_COOKIE]);

  }
}
