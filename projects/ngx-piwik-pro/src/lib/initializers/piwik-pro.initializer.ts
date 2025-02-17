import { APP_INITIALIZER, FactoryProvider, PLATFORM_ID, isDevMode } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import PiwikPro, { DataLayer } from '@piwikpro/tracking-base-library';

import { NGX_PIWIK_PRO_SETTINGS_TOKEN } from '../tokens/ngx-piwik-pro-settings.token';
import { PiwikProSettings } from '../interfaces/piwik-pro-settings.interface';

export const NGX_PIWIK_PRO_INITIALIZER_PROVIDER: FactoryProvider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: PiwikProInitializer,
  deps: [
    NGX_PIWIK_PRO_SETTINGS_TOKEN,
    DOCUMENT,
    PLATFORM_ID,
  ]
}

export function PiwikProInitializer(
  settings: PiwikProSettings,
  document: Document,
  platformId: string
) {
  if (window) {
    window._paq = window._paq || [];
  }
  return async () => {
    if (!isPlatformBrowser(platformId)) {
      return;
    }

    if (!settings.containerId) {
      if (!isDevMode()) {
        console.error('Empty tracking code for Piwik Pro. Make sure to provide one when initializing NgxPiwikProModule.');
      }

      return;
    }

    if (!settings.containerURL) {
      if (!isDevMode()) {
        console.error('Empty tracking URL for Piwik Pro. Make sure to provide one when initializing NgxPiwikProModule.');
      }

      return;
    }

    if (!document) {
      if (!isDevMode()) {
        console.error('Was not possible to access Document interface. Make sure this module is running on a Browser w/ access do Document interface.');
      }
    }

    if(settings.dataLayerName){
        DataLayer.setDataLayerName(settings.dataLayerName)
    }

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    if (settings.nonce) {
      s.setAttribute("nonce", settings.nonce);
    }
    s.text = PiwikPro.getInitScript({
      containerId: settings.containerId,
      containerUrl: settings.containerURL,
      nonceValue: settings.nonce,
      dataLayerName: settings.dataLayerName
    })

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
  }
}
