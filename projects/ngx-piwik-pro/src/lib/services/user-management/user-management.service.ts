import { Injectable } from '@angular/core';
import { UserManagement } from '@piwikpro/tracking-base-library';

type IUserManagement = typeof UserManagement;

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  getUserId(...params: Parameters<IUserManagement['getUserId']>) {
    return UserManagement.getUserId(...params);
  }

  setUserId(...params: Parameters<IUserManagement['setUserId']>) {
    UserManagement.setUserId(...params);
  }

  resetUserId(...params: Parameters<IUserManagement['resetUserId']>) {
    UserManagement.resetUserId(...params);
  }

  getVisitorId(...params: Parameters<IUserManagement['getVisitorId']>) {
    return UserManagement.getVisitorId(...params);
  }

  getVisitorInfo(...params: Parameters<IUserManagement['getVisitorInfo']>) {
    return UserManagement.getVisitorInfo(...params);
  }
  setUserIsAnonymous(
    ...params: Parameters<IUserManagement['setUserIsAnonymous']>
  ) {
    UserManagement.setUserIsAnonymous(...params);
  }
  deanonymizeUser() {
    UserManagement.deanonymizeUser();
  }
}
