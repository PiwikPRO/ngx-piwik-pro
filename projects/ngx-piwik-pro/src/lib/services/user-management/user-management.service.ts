import { Injectable } from '@angular/core';
import { PaqService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/paq/paq.service';
import { TRACK_EVENT } from '@piwik-pro/ngx-piwik-pro/src/lib/constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  getUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any): void {
            resolve(this.getUserId());
          },
        ]);
      } catch (e) {
        if (e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }

  setUserId(userId: string): void {
    this.paqService.push([TRACK_EVENT.SET_USER_ID, userId]);
  }

  resetUserId(): void {
    this.paqService.push([TRACK_EVENT.RESET_USER_ID]);
  }

  getVisitorId(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any): void {
            resolve(this.getVisitorId());
          },
        ]);
      } catch (e) {
        if (e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }

  getVisitorInfo(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any): void {
            resolve(this.getVisitorInfo());
          },
        ]);
      } catch (e) {
        if (e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }
}
