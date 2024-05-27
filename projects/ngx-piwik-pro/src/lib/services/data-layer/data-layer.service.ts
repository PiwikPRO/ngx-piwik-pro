import { DataLayer } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  push(data: any) {
    return DataLayer.push(data);
  }
}
