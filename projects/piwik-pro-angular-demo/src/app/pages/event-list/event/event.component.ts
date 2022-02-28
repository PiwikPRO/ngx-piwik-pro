import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventItem, EventItems } from '../../../shared/event-items/event-items';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  event: EventItem | undefined;

  constructor(
    _route: ActivatedRoute,
    private router: Router,
    public eventItems: EventItems
  ) {
    _route.params.subscribe(param => {
      const eventItem = eventItems.getItemById(param['id']);
      if (eventItem) {
        this.event = eventItem;
      }

      if (!this.event) {
        this.router.navigate(['/events']);
      }
    });
  }

  ngOnInit(): void {
  }

}
