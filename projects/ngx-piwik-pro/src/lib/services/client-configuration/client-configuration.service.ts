import { Injectable } from '@angular/core';
import { ClientConfiguration } from '@piwikpro/tracking-base-library';

type IClientConfiguration = typeof ClientConfiguration;

@Injectable({
  providedIn: 'root',
})
export class ClientConfigurationService {
  setDomains(...params: Parameters<IClientConfiguration['setDomains']>) {
    ClientConfiguration.setDomains(...params);
  }
  getDomains() {
    return ClientConfiguration.getDomains();
  }
}
