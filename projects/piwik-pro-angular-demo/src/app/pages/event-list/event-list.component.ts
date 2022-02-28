import { Component, OnInit } from '@angular/core';
import { EventItems } from '../../shared/event-items/event-items';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  // @HostBinding('class.main-content') readonly mainContentClass = true;

  constructor(public eventItems: EventItems, private titleService: Title) {
    this.titleService.setTitle('Events List');
  }

  ngOnInit(): void {
  }

}
