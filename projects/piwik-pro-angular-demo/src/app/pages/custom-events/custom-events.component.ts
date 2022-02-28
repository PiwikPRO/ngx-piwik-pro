import { Component, OnInit } from '@angular/core';
import { CustomEventsService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/custom-event/custom-events.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-events',
  templateUrl: './custom-events.component.html',
  styleUrls: ['./custom-events.component.scss']
})
export class CustomEventsComponent implements OnInit {

  constructor(
    private titleService: Title,
    private readonly customEventsService: CustomEventsService
  ) {
    this.titleService.setTitle('Custom Events');
  }

  ngOnInit(): void {
  }

  pitch(event: any) {
    this.customEventsService.trackEvent(
      'choose',
      'Move slider',
      'Number',
      event.value
    )
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
