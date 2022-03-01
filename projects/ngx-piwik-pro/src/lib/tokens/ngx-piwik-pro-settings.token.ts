import { InjectionToken } from '@angular/core';
import { PiwikProSettings } from '../interfaces/piwik-pro-settings.interface';

/**
 * Provide a Injection Token to global settings.
 */

export const NGX_PIWIK_PRO_SETTINGS_TOKEN = new InjectionToken<PiwikProSettings>('ngx-piwik-pro-settings', {
  factory: () => ({ containerId: '' , containerURL: '' })
});
