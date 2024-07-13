import { PaymentInformation, Product, eCommerce } from '@piwikpro/tracking-base-library'

import { Injectable } from '@angular/core';
import { PaqService } from '../paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

type IeCommerce = typeof eCommerce;

@Injectable({
  providedIn: 'root'
})
export class ECommerceService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  /**
   * @deprecated Please use the ecommerceAddToCart instead.
   */
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

  ecommerceAddToCart(...params: Parameters<IeCommerce['ecommerceAddToCart']>) {
    eCommerce.ecommerceAddToCart(...params)
  }

  /**
   * @deprecated Please use the ecommerceRemoveFromCart instead.
   */
  removeEcommerceItem(productSKU: string) {
    this.paqService.push([
      TRACK_EVENT.REMOVE_ECOMMERCE_ITEM,
      productSKU
    ])
  }

  ecommerceRemoveFromCart(...params: Parameters<IeCommerce['ecommerceRemoveFromCart']>) {
    eCommerce.ecommerceRemoveFromCart(...params)
  }

  /**
   * @deprecated
   */
  clearEcommerceCart() {
    this.paqService.push([
      TRACK_EVENT.CLEAR_ECOMMERCE_CART,
    ])
  }

  /**
   * @deprecated
   */
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

  /**
   * @deprecated Please use the ecommerceOrder instead.
   */
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

  ecommerceOrder(...params: Parameters<IeCommerce['ecommerceOrder']>) {
    eCommerce.ecommerceOrder(...params)
  }

  /**
   * @deprecated Please use the ecommerceCartUpdate instead.
   */
  trackEcommerceCartUpdate(cartAmount: number) {
    this.paqService.push([
      TRACK_EVENT.UPDATE_ECOMMERCE_CART,
      cartAmount
    ]);
  }

  ecommerceCartUpdate(...params: Parameters<IeCommerce['ecommerceCartUpdate']>) {
    eCommerce.ecommerceCartUpdate(...params)
  }

  /**
   * @deprecated
   */
  setEcommerceView(productSKU: string, productName?: string, productCategory?: string[], productPrice?: string) {
    this.paqService.push([
      TRACK_EVENT.SET_ECOMMERCE_VIEW,
      productSKU,
      productName,
      productCategory,
      productPrice
    ]);
  }

  ecommerceProductDetailView(...params: Parameters<IeCommerce['ecommerceProductDetailView']>) {
    eCommerce.ecommerceProductDetailView(...params)
  }
}
