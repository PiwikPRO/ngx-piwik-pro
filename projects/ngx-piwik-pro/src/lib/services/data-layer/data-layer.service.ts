import { DataLayer } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

type IDataLayer = typeof DataLayer;

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  setDataLayerName(...params: Parameters<IDataLayer['setDataLayerName']>) {
    DataLayer.setDataLayerName(...params);
  }
  push(...params: Parameters<IDataLayer['push']>) {
    return DataLayer.push(...params);
  }
}
