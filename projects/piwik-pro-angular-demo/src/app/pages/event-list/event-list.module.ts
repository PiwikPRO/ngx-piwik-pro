import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { EventListComponent } from './event-list.component';
import { EventComponent } from './event/event.component';
import { RouterModule } from '@angular/router';
import { EventItems } from '../../shared/event-items/event-items';



@NgModule({
  declarations: [
    EventListComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
  ],
  providers: [EventItems],
  exports: []
})
export class EventListModule { }
