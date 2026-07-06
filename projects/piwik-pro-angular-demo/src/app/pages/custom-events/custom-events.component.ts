import { Component, OnInit } from '@angular/core';
import { CustomEventsService } from '@piwikpro/ngx-piwik-pro';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
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
      event.target.value
    )
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
