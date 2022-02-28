import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-goal-conversions',
  templateUrl: './goal-conversions.component.html',
  styleUrls: ['./goal-conversions.component.scss']
})
export class GoalConversionsComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Goal Conversions Component');
  }

  ngOnInit(): void {
  }

}
