import { Inject, Injectable } from '@angular/core';
import { NGX_WINDOW } from '../../tokens/ngx-window-token';
import { PiwikProWindow } from '../../interfaces/piwik-pro-window.interface';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  constructor(
    @Inject(NGX_WINDOW) private readonly _window: PiwikProWindow
  ) {}

  push(data: any) {
    return this._window.dataLayer.push(data);
  }
}
