import { PaymentInformation, Product } from '../../interfaces/piwik-pro-ecommerce.interface';

import { Injectable } from '@angular/core';
import { PaqService } from '../paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

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

  ecommerceAddToCart(products: Product[]) {
    this.paqService.push([TRACK_EVENT.ECOMMERCE_ADD_TO_CART, products])
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

  ecommerceRemoveFromCart(products: Product[]) {
    this.paqService.push([TRACK_EVENT.ECOMMERCE_REMOVE_FROM_CART, products])
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

  ecommerceOrder(
    products: Product[],
    paymentInformation: PaymentInformation
  ) {
    this.paqService.push([TRACK_EVENT.ECOMMERCE_ORDER, products, paymentInformation])
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

  ecommerceCartUpdate(
    products: Product[],
    grandTotal: PaymentInformation['grandTotal']
  ) {
    this.paqService.push([TRACK_EVENT.ECOMMERCE_CART_UPDATE, products, grandTotal])
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

  ecommerceProductDetailView(products: Product[]) {
    this.paqService.push([TRACK_EVENT.ECOMMERCE_PRODUCT_DETAIL_VIEW, products])
  }
}
