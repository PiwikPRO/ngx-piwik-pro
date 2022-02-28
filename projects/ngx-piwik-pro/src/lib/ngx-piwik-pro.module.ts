import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGX_PIWIK_PRO_SETTINGS_TOKEN } from '@piwik-pro/ngx-piwik-pro/src/lib/tokens/ngx-piwik-pro-settings.token';
import { PiwikProSettings } from '@piwik-pro/ngx-piwik-pro/src/lib/interfaces/piwik-pro-settings.interface';
import { NGX_PIWIK_PRO_INITIALIZER_PROVIDER } from '@piwik-pro/ngx-piwik-pro/src/lib/initializers/piwik-pro.initializer';


@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ]
})
export class NgxPiwikProModule {
  constructor() {}

  static forRoot(containerId: string, containerURL: string): ModuleWithProviders<NgxPiwikProModule> {
    return {
      ngModule: NgxPiwikProModule,
      providers: [
        {
          provide: NGX_PIWIK_PRO_SETTINGS_TOKEN,
          useValue: {
            containerId,
            containerURL,
          } as PiwikProSettings
        },
        NGX_PIWIK_PRO_INITIALIZER_PROVIDER,
      ],
    }
  }
}
