import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';

@Injectable({
  providedIn: 'root'
})
export class CustomDimensionsService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string) {
    this.paqService.push(['setCustomDimensionValue', customDimensionId, customDimensionValue]);
  }

  deleteCustomDimension(customDimensionId: string) {
    this.paqService.push(['deleteCustomDimension', customDimensionId]);
  }

  getCustomDimensionValue(customDimensionId: string | number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any): void {
            resolve(this.getCustomDimensionValue(customDimensionId));
          },
        ]);
      } catch (e) {
        if (e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }
}
