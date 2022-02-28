import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-views',
  templateUrl: './page-views.component.html',
  styleUrls: ['./page-views.component.scss']
})
export class PageViewsComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Page Views');
  }

  ngOnInit(): void {
  }

}
