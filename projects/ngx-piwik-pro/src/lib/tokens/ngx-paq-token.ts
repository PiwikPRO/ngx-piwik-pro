import { InjectionToken, inject } from '@angular/core';
import { NGX_WINDOW } from './ngx-window-token';
import { PiwikProWindow } from '@piwik-pro/ngx-piwik-pro/src/lib/interfaces/piwik-pro-window.interface';

/**
 * Check if there is some global function called _paq on Window object, or create an empty function to doesn't brake codes...
 */
export function getPaqFn(window: PiwikProWindow): any {
  return (window)
    ? window['_paq'] = window['_paq'] || []
    : null;
}

/**
 * Provides an injection token to access Piwik Pro Paq
 */
export const NGX_PAQ = new InjectionToken<any>('ngx-paq', {
  providedIn: 'root',
  factory: () => getPaqFn(inject(NGX_WINDOW))
});
