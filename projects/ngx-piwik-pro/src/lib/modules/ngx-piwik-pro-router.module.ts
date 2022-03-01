import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPiwikProModule } from '../ngx-piwik-pro.module';
import { NGX_PIWIK_PRO_ROUTER_INITIALIZER_PROVIDER } from '../initializers/piwik-pro-router.initializer';
import { PiwikProRoutingSettings } from '../interfaces/piwik-pro-router-settings.interface';
import { NGX_PIWIK_PRO_ROUTING_SETTINGS_TOKEN } from '../tokens/ngx-piwik-pro-router-settings.token';

@NgModule({
  imports: [
    CommonModule,
    NgxPiwikProModule,
  ],
  providers: [
    NGX_PIWIK_PRO_ROUTER_INITIALIZER_PROVIDER,
  ],
  declarations: []
})
export class NgxPiwikProRouterModule {
  static forRoot(settings?: PiwikProRoutingSettings): ModuleWithProviders<NgxPiwikProRouterModule> {
    return {
      ngModule: NgxPiwikProRouterModule,
      providers: [
        {
          provide: NGX_PIWIK_PRO_ROUTING_SETTINGS_TOKEN,
          useValue: settings ?? {}
        },
      ]
    };
  }
}
