import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalConversionsComponent } from './goal-conversions/goal-conversions.component';
import {
  ContentTrackingService,
  CustomEventsService,
  DataLayerService,
  NgxPiwikProModule,
  NgxPiwikProRouterModule,
  UserManagementService,
} from '@piwikpro/ngx-piwik-pro';
import { environment } from '../environments/environment';
import { NavbarModule } from './shared/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventListModule } from './pages/event-list/event-list.module';
import { PageViewsComponent } from './pages/page-views/page-views.component';
import { ContentTrackingComponent } from './pages/content-tracking/content-tracking.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CustomEventsComponent } from './pages/custom-events/custom-events.component';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DownloadAndOutlinkComponent } from './pages/download-and-outlink/download-and-outlink.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalConversionsComponent,
    PageViewsComponent,
    ContentTrackingComponent,
    UserManagementComponent,
    CustomEventsComponent,
    ECommerceComponent,
    DownloadAndOutlinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    EventListModule,
    NgxPiwikProModule.forRoot(
      environment.containerId,
      environment.containerURL,
      {
        nonce: '_nonce_',
        dataLayerName: 'myDataLayerName'
      }
    ),
    NgxPiwikProRouterModule.forRoot({ skipFirstPageView: false }),
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatSliderModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [
    UserManagementService,
    ContentTrackingService,
    CustomEventsService,
    DataLayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
