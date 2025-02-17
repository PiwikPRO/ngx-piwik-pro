import { ModuleWithProviders, NgModule } from '@angular/core';
import { InitOptions } from '@piwikpro/tracking-base-library';

import { NGX_PIWIK_PRO_SETTINGS_TOKEN } from './tokens/ngx-piwik-pro-settings.token';
import { PiwikProSettings } from './interfaces/piwik-pro-settings.interface';
import { NGX_PIWIK_PRO_INITIALIZER_PROVIDER } from './initializers/piwik-pro.initializer';

declare global {
  interface Window {
    _paq?: any[];
  }
}

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgxPiwikProModule {
  constructor() {}

  static forRoot(
    containerId: string,
    containerURL: string,
    nonceOrOptions?: string | InitOptions
  ): ModuleWithProviders<NgxPiwikProModule> {
    const options =
      typeof nonceOrOptions === 'string'
        ? {
            nonce: nonceOrOptions,
          }
        : nonceOrOptions;

    return {
      ngModule: NgxPiwikProModule,
      providers: [
        {
          provide: NGX_PIWIK_PRO_SETTINGS_TOKEN,
          useValue: {
            containerId,
            containerURL,
            ...options,
          } as PiwikProSettings,
        },
        NGX_PIWIK_PRO_INITIALIZER_PROVIDER,
      ],
    };
  }
}
