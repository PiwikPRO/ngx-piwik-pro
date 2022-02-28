import { Injectable } from '@angular/core';
import { PaqService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/paq/paq.service';
import { TRACK_EVENT } from '@piwik-pro/ngx-piwik-pro/src/lib/constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class ECommerceService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  addEcommerceItem(
    productSKU: string,
    productName: string,
    productCategory: string | string[],
    productPrice: number,
    productQuantity: number
  ) {
    this.paqService.push([
      TRACK_EVENT.ADD_ECOMMERCE_ITEM,
      productSKU,
      productName,
      productCategory,
      productPrice,
      productQuantity,
    ])
  }

  removeEcommerceItem(productSKU: string) {
    this.paqService.push([
      TRACK_EVENT.REMOVE_ECOMMERCE_ITEM,
      productSKU
    ])
  }

  clearEcommerceCart() {
    this.paqService.push([
      TRACK_EVENT.CLEAR_ECOMMERCE_CART,
    ])
  }

  getEcommerceItems(): Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any): void {
            resolve(this.getEcommerceItems());
          },
        ]);
      } catch (e) {
        if (e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }

  trackEcommerceOrder(
    orderId: string,
    orderGrandTotal: number,
    orderSubTotal?: number,
    orderTax?: number,
    orderShipping?: number,
    orderDiscount?: number
  ) {
    this.paqService.push([
      TRACK_EVENT.ORDER_ECOMMERCE,
      orderId,
      orderGrandTotal,
      orderSubTotal,
      orderTax,
      orderShipping,
      orderDiscount,
    ]);
  }

  trackEcommerceCartUpdate(cartAmount: number) {
    this.paqService.push([
      TRACK_EVENT.UPDATE_ECOMMERCE_CART,
      cartAmount
    ]);
  }

  setEcommerceView(productSKU: string, productName?: string, productCategory?: string[], productPrice?: string) {
    this.paqService.push([
      TRACK_EVENT.SET_ECOMMERCE_VIEW,
      productSKU,
      productName,
      productCategory,
      productPrice
    ]);
  }
}
