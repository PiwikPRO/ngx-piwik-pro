import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalConversionsComponent } from './goal-conversions.component';

describe('GoalConversionsComponent', () => {
  let component: GoalConversionsComponent;
  let fixture: ComponentFixture<GoalConversionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalConversionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalConversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
