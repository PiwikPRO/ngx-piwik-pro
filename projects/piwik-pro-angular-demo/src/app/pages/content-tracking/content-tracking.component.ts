import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContentTrackingService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/content-tracking/content-tracking.service';

@Component({
  selector: 'app-content-tracking',
  templateUrl: './content-tracking.component.html',
  styleUrls: ['./content-tracking.component.scss']
})
export class ContentTrackingComponent implements OnInit {

  constructor(
    private titleService: Title,
    private readonly contentTrackingService: ContentTrackingService,
  ) {
    this.titleService.setTitle('Content tracking');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.contentTrackingService.trackContentImpression('I see You!', 'example-piece', 'example-target' );
    }, 500);
  }

  dontTouchMe() {
    this.contentTrackingService.trackContentInteraction('click', 'don\'t touch me', 'example', 'example')
  }

}
