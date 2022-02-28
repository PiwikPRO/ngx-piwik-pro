import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAndOutlinkComponent } from './download-and-outlink.component';

describe('DownloadAndOutlinkComponent', () => {
  let component: DownloadAndOutlinkComponent;
  let fixture: ComponentFixture<DownloadAndOutlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadAndOutlinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAndOutlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
