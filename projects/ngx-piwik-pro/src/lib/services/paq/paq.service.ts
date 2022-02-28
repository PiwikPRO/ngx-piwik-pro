import { Inject, Injectable } from '@angular/core';
import { NGX_WINDOW } from '@piwik-pro/ngx-piwik-pro/src/lib/tokens/ngx-window-token';
import { PiwikProWindow } from '@piwik-pro/ngx-piwik-pro/src/lib/interfaces/piwik-pro-window.interface';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaqService {
  constructor(
    private readonly titleService: Title,
    private readonly routerService: Router,
    @Inject(NGX_WINDOW) private readonly _window: PiwikProWindow
  ) {}

  push(collection: any[]) {
    if (!this._window._paq) {
      throw new Error("_paq is not available");
    }

    this._window._paq.push(["setCustomUrl", this.routerService.url]);
    this._window._paq.push(["setDocumentTitle", this.titleService.getTitle()]);

    return this._window._paq.push(collection);
  }
}
