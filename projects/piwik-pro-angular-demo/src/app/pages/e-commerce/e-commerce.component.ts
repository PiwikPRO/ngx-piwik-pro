import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ECommerceService } from '@piwik-pro/ngx-piwik-pro/src/lib/services/e-commerce/e-commerce.service';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit {
  public productList: string[];
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
    this.productList.push('Home');
    this.eCommerceService.addEcommerceItem('home-sku', 'Home', 'home', 100, 1);
  }
  addCar() {
    this.productList.push('Car');
    this.eCommerceService.addEcommerceItem('car-sku', 'Car', 'cars', 100, 1);
  }
  addFood() {
    this.productList.push('Food');
    this.eCommerceService.addEcommerceItem('food-sku', 'Food', 'food', 100, 1);
  }

  buy() {
    this.orderReady = true;
    this.productList = [];
    this.eCommerceService.trackEcommerceOrder('order-1', 1000, 400, 300, 100);
  }

  ngOnInit(): void {
  }

}
