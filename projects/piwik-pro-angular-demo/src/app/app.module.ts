import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalConversionsComponent } from './goal-conversions/goal-conversions.component';
import { NgxPiwikProModule } from '@piwik-pro/ngx-piwik-pro/src/lib/ngx-piwik-pro.module';
import { environment } from '../environments/environment';
import { NgxPiwikProRouterModule } from '@piwik-pro/ngx-piwik-pro/src/lib/modules/ngx-piwik-pro-router.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventListModule } from './pages/event-list/event-list.module';
import { PageViewsComponent } from './pages/page-views/page-views.component';
import { ContentTrackingComponent } from './pages/content-tracking/content-tracking.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ContentTrackingService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/content-tracking/content-tracking.service';
import { MatCardModule } from '@angular/material/card';
import { UserManagementService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/user-management/user-management.service';
import { MatListModule } from '@angular/material/list';
import { CustomEventsComponent } from './pages/custom-events/custom-events.component';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { MatSliderModule } from '@angular/material/slider';
import { CustomEventsService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/custom-event/custom-events.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DownloadAndOutlinkComponent } from './pages/download-and-outlink/download-and-outlink.component';
import { DataLayerService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/data-layer/data-layer.service';

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
      // optional config
      {
        nonce: '_nonce_', // nonce string
        dataLayerName: 'myDataLayerName' // custom data layer name
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
