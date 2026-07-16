import PiwikPro from '@piwikpro/tracking-base-library';

import { PiwikProInitializer } from './piwik-pro.initializer';
import { PiwikProSettings } from '../interfaces/piwik-pro-settings.interface';
import { VERSION } from '../../version';

describe('PiwikProInitializer', () => {
  const containerId = 'dummy-container-id';
  const containerURL = 'https://dummy-container-url';
  let head: HTMLHeadElement;
  let documentRef: Document;

  const paq = () => window._paq;

  const buildSettings = (
    overrides: Partial<PiwikProSettings> = {}
  ): PiwikProSettings => ({
    containerId,
    containerURL,
    ...overrides,
  });

  beforeEach(() => {
    head = document.createElement('head');
    documentRef = {
      createElement: (tag: string) => document.createElement(tag),
      getElementsByTagName: (tag: string) =>
        tag === 'head' ? [head] : document.getElementsByTagName(tag),
    } as unknown as Document;

    window._paq = undefined;
    spyOn(PiwikPro, 'getInitScript').and.returnValue('/* init script */');
  });

  it('registers "angular" as the tracking source provider with the library version', async () => {
    await PiwikProInitializer(buildSettings(), documentRef, 'browser')();

    expect(paq()).toContain(['setTrackingSourceProvider', 'angular', VERSION]);
  });

  it('sets the source provider before delegating to core getInitScript', async () => {
    await PiwikProInitializer(buildSettings(), documentRef, 'browser')();

    expect(paq()?.[0]).toEqual(['setTrackingSourceProvider', 'angular', VERSION]);
    expect(PiwikPro.getInitScript).toHaveBeenCalled();
  });

  it('forwards the settings to core getInitScript and injects the script', async () => {
    await PiwikProInitializer(
      buildSettings({ nonce: 'abc', dataLayerName: 'customLayer' }),
      documentRef,
      'browser'
    )();

    expect(PiwikPro.getInitScript).toHaveBeenCalledWith({
      containerId,
      containerUrl: containerURL,
      nonceValue: 'abc',
      dataLayerName: 'customLayer',
    });

    const scripts = head.getElementsByTagName('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].async).toBeTrue();
    expect(scripts[0].getAttribute('nonce')).toEqual('abc');
    expect(scripts[0].text).toEqual('/* init script */');
  });

  it('injects the script without a nonce attribute when no nonce is provided', async () => {
    await PiwikProInitializer(buildSettings(), documentRef, 'browser')();

    const scripts = head.getElementsByTagName('script');
    expect(scripts.length).toBe(1);
    expect(scripts[0].hasAttribute('nonce')).toBeFalse();
  });

  it('skips initialization during SSR (non-browser platform)', async () => {
    await PiwikProInitializer(buildSettings(), documentRef, 'server')();

    expect(paq()).toBeUndefined();
    expect(PiwikPro.getInitScript).not.toHaveBeenCalled();
    expect(head.getElementsByTagName('script').length).toBe(0);
  });

  it('does not inject a script when the container id is missing', async () => {
    await PiwikProInitializer(buildSettings({ containerId: '' }), documentRef, 'browser')();

    expect(paq()).toContain(['setTrackingSourceProvider', 'angular', VERSION]);
    expect(PiwikPro.getInitScript).not.toHaveBeenCalled();
    expect(head.getElementsByTagName('script').length).toBe(0);
  });

  it('does not inject a script when the container url is missing', async () => {
    await PiwikProInitializer(buildSettings({ containerURL: '' }), documentRef, 'browser')();

    expect(PiwikPro.getInitScript).not.toHaveBeenCalled();
    expect(head.getElementsByTagName('script').length).toBe(0);
  });
});
