import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGX_PIWIK_PRO_SETTINGS_TOKEN } from './tokens/ngx-piwik-pro-settings.token';
import { PiwikProSettings } from './interfaces/piwik-pro-settings.interface';
import { NGX_PIWIK_PRO_INITIALIZER_PROVIDER } from './initializers/piwik-pro.initializer';


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

  static forRoot(containerId: string, containerURL: string, nonce?: string): ModuleWithProviders<NgxPiwikProModule> {
    return {
      ngModule: NgxPiwikProModule,
      providers: [
        {
          provide: NGX_PIWIK_PRO_SETTINGS_TOKEN,
          useValue: {
            containerId,
            containerURL,
            nonce
          } as PiwikProSettings
        },
        NGX_PIWIK_PRO_INITIALIZER_PROVIDER,
      ],
    }
  }
}
