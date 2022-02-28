import { APP_BOOTSTRAP_LISTENER, ComponentRef, Provider } from '@angular/core';
import { NGX_PIWIK_PRO_ROUTING_SETTINGS_TOKEN } from '@piwik-pro/ngx-piwik-pro/src/lib/tokens/ngx-piwik-pro-router-settings.token';
import { PiwikProRoutingSettings } from '@piwik-pro/ngx-piwik-pro/src/lib/interfaces/piwik-pro-router-settings.interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { PageViewsService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/page-views/page-views.service';

export const NGX_PIWIK_PRO_ROUTER_INITIALIZER_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: PiwikProRouterInitializer,
  deps: [
    NGX_PIWIK_PRO_ROUTING_SETTINGS_TOKEN,
    Title,
    PageViewsService,
  ]
};

export function PiwikProRouterInitializer(
  settings: PiwikProRoutingSettings,
  titleService: Title,
  pageViewsService: PageViewsService,
) {
  return async (c: ComponentRef<any>) => {
    const router = c.injector.get(Router);
    const { include = [], exclude = [] } = settings ?? {};
    const includeRules = normalizePathRules(include);
    const excludeRules = normalizePathRules(exclude);
    const subs = router
      .events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        skip(1), // Prevend double views on the first tigger (because PiwikPro Already send one ping on setup)
        filter(event => includeRules.length > 0
          ? includeRules.some(rule => rule.test(event.urlAfterRedirects))
          : true),
        filter(event => excludeRules.length > 0
          ? !excludeRules.some(rule => rule.test(event.urlAfterRedirects))
          : true),
        // delay(5000)
      )
      .subscribe(() => {
        pageViewsService.trackPageView();
      });
    // Cleanup
    c.onDestroy(() => subs.unsubscribe());
  };
}

/** Converts all path rules from string to Regex instances */
function normalizePathRules(rules: Array<string | RegExp>): Array<RegExp> {
  return rules.map(rule => (rule instanceof RegExp)
    ? rule
    : new RegExp(`^${rule.replace('*', '.*')}$`, 'i'));
}
