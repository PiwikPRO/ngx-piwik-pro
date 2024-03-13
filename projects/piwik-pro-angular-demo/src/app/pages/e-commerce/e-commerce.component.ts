import { Component, OnInit } from '@angular/core';

import { ECommerceService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/e-commerce/e-commerce.service';
import { Product } from '@piwik-pro/ngx-piwik-pro/src/lib/interfaces/piwik-pro-ecommerce.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {
  public productList: Product[];
  public orderReady: boolean;

  constructor(
    private titleService: Title,
    private readonly eCommerceService: ECommerceService,
  ) {
    this.productList = [];
    this.orderReady = false;
    this.titleService.setTitle('Custom Events');
  }

  addHome() {
    this.productList.push({
      sku: 'sku-1',
      name: 'Product 1',
      category: ['product-category', 'product-category-1'],
      brand: 'Brand 1',
      variant: 'Variant 1',
      price: 9.99,
      customDimensions: {
        1: 'value1',
        2: 'value2',
      },
    });
    this.eCommerceService.ecommerceAddToCart([
      {
        sku: 'sku-1',
        name: 'Product 1',
        category: ['product-category', 'product-category-1'],
        brand: 'Brand 1',
        variant: 'Variant 1',
        price: 9.99,
        customDimensions: {
          1: 'value1',
          2: 'value2',
        },
      },
    ]);
  }
  addCar() {
    this.productList.push({
        sku: 'sku-2',
        name: 'Product 2',
        category: ['product-category', 'product-category-2'],
        brand: 'Brand 2',
        variant: 'Variant 2',
        price: 19.98,
        customDimensions: {
          1: 'value1',
          2: 'value2',
        },
      });
    this.eCommerceService.ecommerceAddToCart([
      {
        sku: 'sku-2',
        name: 'Product 2',
        category: ['product-category', 'product-category-2'],
        brand: 'Brand 2',
        variant: 'Variant 2',
        price: 19.98,
        customDimensions: {
          1: 'value1',
          2: 'value2',
        },
      }
    ]);
  }
  addFood() {
    this.productList.push({
      sku: 'sku-3',
      name: 'Product 3',
      category: ['product-category', 'product-category-3'],
      brand: 'Brand 3',
      variant: 'Variant 3',
      price: 29.97,
      customDimensions: {
        1: 'value1',
        2: 'value2',
      },
    });
    this.eCommerceService.ecommerceAddToCart([
      {
        sku: 'sku-3',
        name: 'Product 3',
        category: ['product-category', 'product-category-3'],
        brand: 'Brand 3',
        variant: 'Variant 3',
        price: 29.97,
        customDimensions: {
          1: 'value1',
          2: 'value2',
        },
      }
    ]);
  }

  buy() {
    this.orderReady = true;
    this.productList = [];

    const tax = 0.12;
    const shipping = 10;
    const discount = 5;
    const subTotal = this.productList.reduce((total, product) => total + (product.price ?? 0), 0)

    this.eCommerceService.ecommerceOrder(this.productList, {
      orderId: 'order-1',
      grandTotal: (subTotal * tax) + shipping - discount,
      subTotal,
      tax,
      shipping,
      discount,
    });
  }

  ngOnInit(): void {
  }

}
