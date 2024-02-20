# Piwik PRO Library for Angular

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in Angular 8+ applications.

* [Installation](#installation)
  * [NPM](#npm)
  * [Basic setup](#basic-setup)
  * [Routing setup](#set-up-the-routing-module)
  * [Advanced routing setup](#advanced-setup-for-the-routing-module)
* [Piwik PRO Services](#piwik-pro-services)
  * [Custom Events](#send-custom-events)
  * [Page Views](#send-page-views-and-virtual-page-views)
* [API](#api)
  * [Page Views Service](#page-views-service)
  * [User Management](#user-management)
  * [Custom Event](#custom-event)
  * [Site search Service](#site-search-service)
  * [E-Commerce Service](#e-commerce-service)
  * [Content Tracking Service](#content-tracking-service)
  * [Download and outlink Service](#download-and-outlink-service)
  * [Goal Conversions](#goal-conversions)
  * [Custom Dimensions](#custom-dimensions)

## Installation

### NPM

To use this package in your project, run the following command.

```
npm install @piwikpro/ngx-piwik-pro
```


### Basic setup

In your Angular Project, include the `NgxPiwikProModule` in the highest level application module. ie `AddModule`.
To set up the Piwik PRO Tag Manager container in the app, the easiest way is to call the `forRoot()` method.
In the arguments, pass your app ID and your account URL as parameters (marked 'container-id' and 'container-url' in the example below).

```ts  
import { NgxPiwikProModule } from '@piwikpro/ngx-piwik-pro';  
  
@NgModule({  
  declarations: [  
    AppComponent  
  ],  
  imports: [  
    BrowserModule,  
    NgxPiwikProModule.forRoot('container-id', 'container-url')  
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
  ],  
  providers: [],  
  bootstrap: [AppComponent]  
})
export class AppModule { }  
```

### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

```ts
import { NgxPiwikProModule } from '@piwikpro/ngx-piwik-pro';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPiwikProModule.forRoot('container-id', 'container-url', 'nonce-hash')
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  
```


### Set up the Routing Module

We provide a second Module Dependency to configure Router Event Bindings and perform automatic page views every time your application navigates to another page.

Add ```NgxPiwikProRouterModule``` on AppModule to enable auto track `Router` events.

**IMPORTANT:** This Module subscribes to Router events when the bootstrap component is created, and then cleans up any subscriptions related to previous component when it is destroyed. You may get some issues if using this module with server side rendering or multiple bootstrap components. If that's the case, we recommend subscribing to the page view events manually.

```ts  
import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwikpro/ngx-piwik-pro';  
...  
  
@NgModule({  
  ...  
  imports: [  
    ...  
    NgxPiwikProModule.forRoot('container-id'),  
    NgxPiwikProRouterModule  
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
  ]  
})  
export class AppModule {}  
```  

### Advanced setup for the Routing Module

#### You can customize some rules to include/exclude routes on `NgxPiwikProRouterModule`. The include/exclude settings allow:
* Simple route matching: `{ include: [ '/full-uri-match' ] }`;
* Wildcard route matching: `{ include: [ '*/public/*' ] }`;
* Regular Expression route matching: `{ include: [ /^\/public\/.*/ ] }`;

```ts  
import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwikpro/ngx-piwik-pro';  
...  
  
@NgModule({  
  ...  
  imports: [  
    ...  
    NgxPiwikProModule.forRoot('container-id'),  
    NgxPiwikProRouterModule.forRoot({ include: [...], exclude: [...] })  
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
  ]  
})  
export class AppModule {}  
```


#### Track of PageViews from the first visit to the site.

The default 'Data Collection' settings assume that the 'Track page views in a single-page application' option is set to true. You will find an iformation that if this option is enabled, we will record every change in the state of the browser history on the page and report it as a page view in the reports. You need to know that this option should be disabled if you want to use the ngx-piwik-pro library.

This setting can be found in:
`Administration -> Sites & Apps -> (choose your site or apps ) -> Data Collection -> Track page views in a single-page application`

In order to work according to the default Data Collection settings, the library skips the first PageViews so as not to cause duplicate entries. However, if you have taken care to disable the above settings, you should also pass the following settings to the library.

```ts  
import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwikpro/ngx-piwik-pro';  
...  
  
@NgModule({  
  ...  
  imports: [  
    ...  
    NgxPiwikProModule.forRoot('container-id'),  
    NgxPiwikProRouterModule.forRoot({ skipFirstPageView: false })  
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  
  ]  
})  
export class AppModule {}  
```

## Piwik PRO Services

### Send Custom Events

```ts  
@Component( ... )  
export class TestFormComponent {  
  
  constructor(  
    private customEventsService: CustomEventsService  
  ) {}  
  
  onUserInputName() {  
    ...  
    this.customEventsService.trackEvent('user_register_form', 'enter_name', 'Name', 'Value');   
  }  
  
  onUserInputEmail() {  
    ...
    this.customEventsService.trackEvent('user_register_form', 'enter_email', 'Email', 'Value');    
  }  
  
  onSubmit() {  
    ...  
    this.customEventsService.trackEvent('user_register_form', 'submit', 'Sent');  
  }  
}

```

### Send page views and virtual page views

```ts  
@Component(...)  
export class TestPageComponent implements OnInit {  
  
  constructor(  
    protected pageViewsService: PageViewsService  
  ) {}  
  
  ngOnInit() {  
    this.pageViewsService.trackPageView('Title')  
  }  
  
}  
```

### Send an event with Data Layer

```ts
@Component(...)
export class TestPageComponent implements OnInit {

  constructor(
    protected dataLayerService: DataLayerService
  ) {}

  ngOnInit() {
    this.dataLayerService.push({ event: 'test-event' })
  }

}  
```

## API

### Page Views Service
A page view is the most basic type of a tracked event. It represents a single page viewing action.
#### Methods
* `trackPageView(customPageTitle?: string)` - Tracks a visit on the page that the function was run on.

### User Management
#### Methods
* `getUserId()` - The function that will return user ID.
* `setUserId(userId: string)` - user ID is an additional parameter that allows you to aggregate data. When set up, you will be able to search through sessions by this parameter, filter reports through it or create Multi attribution reports using User ID.
* `resetUserId()` - Clears previously set `userID`, e.g. when visitor logs out.
* `getVisitorId()`  - Returns 16-character hex ID of the visitor.
* `getVisitorInfo()` - Returns visitor information in an array:
  * new visitor flag indicating new (1) or returning (0) visitor
  * visitor ID (UUID)
  * first visit timestamp (Unix epoch time)
  * previous visit count (0 for first visit)
  * current visit timestamp (Unix epoch time)
  * last visit timestamp (Unix epoch time or '' if N/A)
  * last e-commerce order timestamp (Unix epoch time or '' if N/A)

### Custom Events
Custom events enable tracking visitor actions that are not predefined in the existing [JavaScript Tracking Client API](https://developers.piwik.pro/en/latest/data_collection/web/javascript_tracking_client/api.html), allowing web analysts to accurately measure and analyze any domain.
#### Methods
* `trackEvent(category: string, action: string, name?: string, value?: number) ` - Tracks a custom event, e.g. when a visitor interacts with the page.

### Site search Service
Site search tracking gives you insights into how visitors interact with the search engine on your website - what they search for and how many results they get back.
#### Methods
* `trackSiteSearch(keyword: string, category?: string, searchCount?: number, dimensions?: Object)` - Tracks search requests on a website.

### E-Commerce Service
#### Methods 
* `ecommerceAddToCart(products: Product[])` - Tracks action of adding products to a cart.
* `ecommerceRemoveFromCart(products: Product[])` - Tracks action of removing a products from a cart.
* `ecommerceOrder(products: Product[], paymentInformation: PaymentInformation)` - Tracks conversion (including products and payment details).
* `ecommerceCartUpdate(products: Product[], grandTotal: PaymentInformation['grandTotal'])` - Tracks current state of a cart.
* `ecommerceProductDetailView(products: Product[])` - Tracks product or category view. Must be followed by a page view.

#### Deprecated methods
* `addEcommerceItem(productSKU: string, productName: string, productCategory: string | string[], productPrice: number, productQuantity: number)` - Adds a product to a virtual shopping cart. If a product with the same SKU is in the cart, it will be removed first. Does not send any data to the Collecting & Processing Pipeline.
* `removeEcommerceItem(productSKU: string)` - Removes a product with the provided SKU from a virtual shopping cart. If multiple units of that product are in the virtual cart, all of them will be removed. Does not send any data to the Collecting & Processing Pipeline.
* `clearEcommerceCart()` - Removes all items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline.
* `getEcommerceItems()` - Returns a copy of items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline
* `trackEcommerceOrder()` - Tracks a successfully placed e-commerce order with items present in a virtual cart (registered using addEcommerceItem).
* `trackEcommerceCartUpdate(cartAmount: number)` - Tracks items present in a virtual shopping cart (registered with addEcommerceItem)
* `setEcommerceView(productSKU: string, productName?: string, productCategory?: string[], productPrice?: string)` - Tracks product or category view. Must be followed by a page view.

### Content Tracking Service
Content Tracking lets you track what content is visible on your site and how users interact with it.
### Methods
* `trackContentImpression(contentName: string, contentPiece: string, contentTarget: string)` - Tracks manual content impression event.
* `trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string)` - Tracks manual content interaction event.

### Download and outlink Service
* `trackLink(url: string, linkType: string, customData?: object, callback?: (params: any) => void)` - Manually tracks outlink or download event with provided values.
* `enableLinkTracking(enable: boolean)`  - Enables or disables automatic link tracking. If enabled, left, right and middle clicks on links will be treated as opening a link. Opening a links to an external site (different domain) creates an outlink event. Opening a link to a downloadable file creates a download event.
* `setLinkClasses(classes: string[])`  - Sets a list of class names that indicate whether a link is an outlink and not download.
* `setDownloadClasses(classes: string[])`  - Sets a list of class names that indicate whether a list is a download and not an outlink.
* `setDownloadExtensions(extensions: string[])`  - Overwrites the list of file extensions indicating that a link is a download.
* `addDownloadExtensions(extensions: string[])`  - Adds new extensions to the download extensions list.
* `removeDownloadExtensions(extensions: string[])`  - Removes extensions from the download extensions list.
* `setLinkTrackingTimer(time: number)`  - When a visitor produces an events and closes the page immediately afterwards, e.g. when opening a link, the request might get cancelled. To avoid loosing the last event this way, JavaScript Tracking Client will lock the page for a fraction of a second (if wait time hasn’t passed), giving the request time to reach the Collecting & Processing Pipeline.
* `getLinkTrackingTimer()`  - Returns lock/wait time after a request set by setLinkTrackingTimer.
* `setIgnoreClasses(classes: string[])` - Set a list of class names that indicate a link should not be tracked.

### Goal Conversions
Goals let you define important actions registered in your application and track conversions when the conditions for the action are fulfilled.

* `trackGoal(goalId: number | string, conversionValue: number, dimensions?: Object)` - Tracks manual goal conversion.

### Custom Dimensions
* `setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string)`  - Sets a custom dimension value to be used later.
* `deleteCustomDimension(customDimensionId: string)` - Removes a custom dimension with the specified ID.
* `getCustomDimensionValue(customDimensionId: string | number)` - Returns the value of a custom dimension with the specified ID.

### Data Layer
A data layer is a data structure on your site or app where you can store data and access it with tools like Tag Manager. You can include any data you want in your data layer.

#### Methods
* `push(dataLayerObject: Object)`  - Adds an event to a data layer.
