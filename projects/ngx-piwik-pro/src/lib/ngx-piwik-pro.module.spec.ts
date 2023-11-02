import { TestBed } from '@angular/core/testing';
import { NgxPiwikProModule } from './ngx-piwik-pro.module';
import { NGX_PIWIK_PRO_SETTINGS_TOKEN } from '@piwik-pro/ngx-piwik-pro';
import { APP_INITIALIZER } from '@angular/core';
import { PiwikProSettings } from '@piwik-pro/ngx-piwik-pro/src/lib/interfaces/piwik-pro-settings.interface';
import { DOCUMENT } from '@angular/common';

describe('NgxPiwikProModule test', () => {
  const containerId = 'dummy-container-id';
  const containerURL = 'https://dummy-container-url';
  let settings: PiwikProSettings;
  let document: Document;
  let head: HTMLHeadElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPiwikProModule.forRoot(containerId, containerURL)],
    }).compileComponents();

    settings = await TestBed.inject(NGX_PIWIK_PRO_SETTINGS_TOKEN);
    document = await TestBed.inject(DOCUMENT);
    head = document.getElementsByTagName('head')[0];
  });

  afterEach(() => {
    // TestBed.resetTestingModule();
    while (head.firstChild) {
      head.removeChild(head.firstChild);
    }
  });

  it('should be created', () => {
    const module = TestBed.inject(NgxPiwikProModule);
    expect(module).toBeTruthy();
  });

  it('should provide settings', async () => {
    expect(settings).toBeTruthy();
    expect(settings.containerURL).toEqual('');
    expect(settings.containerId).toEqual('');
  });

  it('should provide initializer', async () => {
    TestBed.inject(APP_INITIALIZER);

    const scripts = head.getElementsByTagName('script');

    expect(scripts.length).toBe(2);
    expect(scripts[0].src).toEqual(`${containerURL}/containers/${containerId}.js`);
  });
});
