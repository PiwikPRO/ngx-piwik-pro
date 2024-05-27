import { Injectable } from '@angular/core';
import { UserManagement } from '@piwikpro/tracking-base-library'

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  getUserId(): Promise<string> {
    return UserManagement.getUserId()
  }

  setUserId(userId: string): void {
    UserManagement.setUserId(userId)
  }

  resetUserId(): void {
    UserManagement.resetUserId()
  }

  getVisitorId(): Promise<any> {
    return UserManagement.getVisitorId()
  }

  getVisitorInfo(): Promise<any[]> {
    return UserManagement.getVisitorInfo()
  }
}
