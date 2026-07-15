import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { ClientConfigurationService } from './services/client-configuration/client-configuration.service';
import { ContentTrackingService } from './services/content-tracking/content-tracking.service';
import { CookieManagementService } from './services/cookie-management/cookie-management.service';
import { CrossDomainTrackingService } from './services/cross-domain-tracking/cross-domain-tracking.service';
import { CustomDimensionsService } from './services/custom-dimensions/custom-dimensions.service';
import { CustomEventsService } from './services/custom-event/custom-events.service';
import { DataLayerService } from './services/data-layer/data-layer.service';
import { DownloadAndOutlinkService } from './services/download-and-outlink/download-and-outlink.service';
import { ECommerceService } from './services/e-commerce/e-commerce.service';
import { GoalConversionsService } from './services/goal-conversions/goal-conversions.service';
import { HeartbeatService } from './services/heartbeat/heartbeat.service';
import { MiscellaneousService } from './services/miscellaneous/miscellaneous.service';
import { PageViewsService } from './services/page-views/page-views.service';
import { PaqService } from './services/paq/paq.service';
import { SiteSearchService } from './services/site-search/site-search.service';
import { UserManagementService } from './services/user-management/user-management.service';

const EXPECTED_SERVICES: ReadonlyArray<readonly [string, Type<unknown>]> = [
  ['PageViewsService', PageViewsService],
  ['CustomEventsService', CustomEventsService],
  ['ContentTrackingService', ContentTrackingService],
  ['CookieManagementService', CookieManagementService],
  ['CustomDimensionsService', CustomDimensionsService],
  ['DownloadAndOutlinkService', DownloadAndOutlinkService],
  ['ECommerceService', ECommerceService],
  ['GoalConversionsService', GoalConversionsService],
  ['SiteSearchService', SiteSearchService],
  ['UserManagementService', UserManagementService],
  ['DataLayerService', DataLayerService],
  ['CrossDomainTrackingService', CrossDomainTrackingService],
  ['ClientConfigurationService', ClientConfigurationService],
  ['HeartbeatService', HeartbeatService],
  ['MiscellaneousService', MiscellaneousService],
  ['PaqService', PaqService],
];

describe('public surface of @piwikpro/ngx-piwik-pro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { url: '/' } },
        ...EXPECTED_SERVICES.map(([, service]) => service),
      ],
    });
  });

  EXPECTED_SERVICES.forEach(([name, service]) => {
    it(`provides an injectable "${name}"`, () => {
      expect(TestBed.inject(service)).toBeTruthy();
    });
  });
});
