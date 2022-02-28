import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalConversionsComponent } from './goal-conversions/goal-conversions.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { PageViewsComponent } from './pages/page-views/page-views.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ContentTrackingComponent } from './pages/content-tracking/content-tracking.component';
import { CustomEventsComponent } from './pages/custom-events/custom-events.component';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { DownloadAndOutlinkComponent } from './pages/download-and-outlink/download-and-outlink.component';

const routes: Routes = [
  // { path: 'event', component: EventComponent },
  { path: 'event/page-views', component: PageViewsComponent },
  { path: 'event/user-management', component: UserManagementComponent },
  { path: 'event/content-tracking', component: ContentTrackingComponent },
  { path: 'event/custom-events', component: CustomEventsComponent },
  { path: 'event/e-commerce', component: ECommerceComponent },
  { path: 'event/downloads-and-outlinks', component: DownloadAndOutlinkComponent },
  { path: 'events', component: EventListComponent },
  { path: 'goal-conversions', component: GoalConversionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
