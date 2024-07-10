import { CustomDimensions } from '@piwikpro/tracking-base-library';
import { Injectable } from '@angular/core';

type ICustomDimensions = typeof CustomDimensions;

@Injectable({
  providedIn: 'root'
})
export class CustomDimensionsService {
  getCustomDimensionValue(...params: Parameters<ICustomDimensions['getCustomDimensionValue']>): Promise<string | undefined> {
    return CustomDimensions.getCustomDimensionValue(...params);
  }
  
  setCustomDimensionValue(...params: Parameters<ICustomDimensions['setCustomDimensionValue']>) {
    CustomDimensions.setCustomDimensionValue(...params);
  }

  deleteCustomDimension(...params: Parameters<ICustomDimensions['deleteCustomDimension']>) {
    CustomDimensions.deleteCustomDimension(...params);
  }
}
