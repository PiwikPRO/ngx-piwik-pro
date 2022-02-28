import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEventsComponent } from './custom-events.component';

describe('CustomEventsComponent', () => {
  let component: CustomEventsComponent;
  let fixture: ComponentFixture<CustomEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
