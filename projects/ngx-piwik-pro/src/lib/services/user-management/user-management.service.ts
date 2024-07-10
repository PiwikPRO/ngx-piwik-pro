import { Injectable } from '@angular/core';
import { UserManagement } from '@piwikpro/tracking-base-library'

type IUserManagement = typeof UserManagement

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  getUserId(...params: Parameters<IUserManagement['getUserId']>): Promise<string> {
    return UserManagement.getUserId(...params)
  }

  setUserId(...params: Parameters<IUserManagement['setUserId']>): void {
    UserManagement.setUserId(...params)
  }

  resetUserId(...params: Parameters<IUserManagement['resetUserId']>): void {
    UserManagement.resetUserId(...params)
  }

  getVisitorId(...params: Parameters<IUserManagement['getVisitorId']>): Promise<any> {
    return UserManagement.getVisitorId(...params)
  }

  getVisitorInfo(...params: Parameters<IUserManagement['getVisitorInfo']>): Promise<any[]> {
    return UserManagement.getVisitorInfo(...params)
  }
}
