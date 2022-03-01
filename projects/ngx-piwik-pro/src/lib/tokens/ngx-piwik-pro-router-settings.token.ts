import { InjectionToken } from '@angular/core';
import { PiwikProRoutingSettings } from '../interfaces/piwik-pro-router-settings.interface';

export const NGX_PIWIK_PRO_ROUTING_SETTINGS_TOKEN = new InjectionToken<PiwikProRoutingSettings>('ngx-google-analytics-routing-settings', {
  factory: () => ({})
});
