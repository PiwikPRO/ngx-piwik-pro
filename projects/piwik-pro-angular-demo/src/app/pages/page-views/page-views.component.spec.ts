import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewsComponent } from './page-views.component';

describe('PageViewsComponent', () => {
  let component: PageViewsComponent;
  let fixture: ComponentFixture<PageViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
