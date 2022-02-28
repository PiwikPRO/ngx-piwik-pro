import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserManagementService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/user-management/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public userData: any;
  constructor(
    private titleService: Title,
    private userService: UserManagementService,
  ) {
    this.titleService.setTitle('User Management');
    this.userData = '';
  }

  getUserId() {
    return this.userData;
  }

  ngOnInit(): void {
    setTimeout(() => {
      const userId = this.userService.getVisitorInfo().then((value) => {

        this.userData = {
          newVisitor: value[0],
          visitorId: value[1],
          firstVisit: value[2],
          prevVisit: value[3],
          currentVisit: value[4],
          lastVisit: value[5],
          lastECommerce: value[6]
        };
      })
    }, 500)
  }

}
