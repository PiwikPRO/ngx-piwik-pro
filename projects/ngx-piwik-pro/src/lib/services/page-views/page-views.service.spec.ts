import { TestBed } from '@angular/core/testing';
import { PageViewsService } from './page-views.service';
import { PaqService } from '../paq/paq.service';

describe('PageViewsService', () => {
  let service: PageViewsService;

  class FakePaqService {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageViewsService, { provide: PaqService, useValue: FakePaqService }]
    });
    service = TestBed.inject(PageViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
