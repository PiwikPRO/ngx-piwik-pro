import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataLayerService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/data-layer/data-layer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'piwik-pro-angular-demo';
  constructor(private titleService: Title, private readonly dataLayerService: DataLayerService) {
    this.titleService.setTitle('Home Page')
    this.dataLayerService.push({ name: "my custom data layer entry" })
  }
}
