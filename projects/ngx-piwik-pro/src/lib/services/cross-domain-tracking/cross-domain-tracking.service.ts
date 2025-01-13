import { CrossDomainTracking } from '@piwikpro/tracking-base-library';

type ICrossDomainTracking = typeof CrossDomainTracking;

export class CrossDomainTrackingService {
  enableCrossDomainLinking(
    ...params: Parameters<ICrossDomainTracking['enableCrossDomainLinking']>
  ) {
    CrossDomainTracking.enableCrossDomainLinking(...params);
  }
  disableCrossDomainLinking(
    ...params: Parameters<ICrossDomainTracking['disableCrossDomainLinking']>
  ) {
    CrossDomainTracking.disableCrossDomainLinking(...params);
  }
  isCrossDomainLinkingEnabled() {
    return CrossDomainTracking.isCrossDomainLinkingEnabled();
  }
  setCrossDomainLinkingTimeout(
    ...params: Parameters<ICrossDomainTracking['setCrossDomainLinkingTimeout']>
  ) {
    return CrossDomainTracking.setCrossDomainLinkingTimeout(...params);
  }
  getCrossDomainLinkingUrlParameter() {
    return CrossDomainTracking.getCrossDomainLinkingUrlParameter();
  }
  customCrossDomainLinkDecorator(
    ...params: Parameters<
      ICrossDomainTracking['customCrossDomainLinkDecorator']
    >
  ) {
    return CrossDomainTracking.customCrossDomainLinkDecorator(...params);
  }
  customCrossDomainLinkVisitorIdGetter(
    ...params: Parameters<
      ICrossDomainTracking['customCrossDomainLinkVisitorIdGetter']
    >
  ) {
    return CrossDomainTracking.customCrossDomainLinkVisitorIdGetter(...params);
  }
}
