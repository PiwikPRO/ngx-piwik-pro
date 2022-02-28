# Ngx Piwik Pro!

An easy implementation to PiwikPro Tag Manager on angular8+ apps.

# Index

* [Setup](#setup)
  * [NPM](#npm)
  * [Simple Setup](#simple-setup)
  * [Routing Setup](#setup-routing-module)
  * [Advanced Routing Setup](#advanced-setup-routing-module)
* [PiwikPro Services](#piwikpro-services)
  * [Custom Events](#call-custom-events)
  * [Page Views](#call-page-views-and-virtual-page-views)
* [Api](#api)
  * [Page Views Service](#page-views-service)
  * [User Management](#user-management)
  * [Custom Event](#custom-event)
  * [Site search Service](#site-search-service)
  * [E-Commerce Service](#e-commerce-service)
  * [Content Tracking Service](#content-tracking-service)
  * [Download and outlink Service](#download-and-outlink-service)
  * [Goal Conversions](#goal-conversions)
  * [Custom Dimensions](#custom-dimensions)

## Setup

### NPM

To setup this package on you project, just call the following command.

```
npm install @piwik-pro/ngx-piwik-pro
```


### Simple Setup

On your Angular Project, you shall include the `NgxPiwikProModule` on your highest level application module. ie `AddModule`. The easiest install mode call the `forRoot()` method and pass the Piwik Pro Container ID and Piwik Pro Container URL.

```ts  
import { NgxPiwikProModule } from '@piwik-pro/ngx-piwik-pro';  
  
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


### Setup Routing Module

We provide a second Module Dependency to configure Router Event Bindings and perform automatic page view every time your application navigates to another page.

Add ```NgxPiwikProRouterModule``` on AppModule enable auto track `Router` events.

**IMPORTANT:** This Module just subscribe to Router events when the bootstrap component is created, and then cleans up any subscriptions related to previous component when it is destroyed. You may get some issues if using this module on a server side rendering or multiple bootstrap components. If it is your case, I suggest you subscribe to events by yourself.

```ts  
import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwik-pro/ngx-piwik-pro';  
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

### Advanced Setup Routing Module

You can customize some rules to include/exclude routes on `NgxPiwikProRouterModule`. The include/exclude settings allow:
* Simple route match: `{ include: [ '/full-uri-match' ] }`;
* Wildcard route match: `{ include: [ '*/public/*' ] }`;
* Regular Expression route match: `{ include: [ /^\/public\/.*/ ] }`;

```ts  
import { NgxPiwikProModule, NgxPiwikProRouterModule } from '@piwik-pro/ngx-piwik-pro';  
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

## PiwikPro Services


### Call Custom Events

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

### Call Page Views and Virtual Page Views

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

## API

### Page Views Service
Page view is the most basic type of the tracked event. It represents a single page viewing action.
#### Methods
* `trackPageView(customPageTitle?: string)` - Tracks a visit on the page that the function was run on.

### User Management
#### Methods
* `getUserId()` - The function that will return user ID.
* `setUserId(userId: string)` - user ID is an additional parameter that allows you to aggregate data. When set you will be able to search through sessions by this parameter, filter reports through it or create Multi attribution reports using User ID.
* `resetUserId()` -   Clears previously set `userID`, e.g. when visitor logs out.
* `getVisitorId()`  - Returns 16-character hex ID of the visitor.
* `getVisitorInfo()` - Returns visitor information in array:
  * new visitor flag indicating new (1) or returning (0) visitor
  * visitor ID (UUID)
  * first visit timestamp (Unix epoch time)
  * previous visit count (0 for first visit)
  * current visit timestamp (Unix epoch time)
  * last visit timestamp (Unix epoch time or '' if N/A)
  * last e-commerce order timestamp (Unix epoch time or '' if N/A)

### Custom Event
Custom events enable tracking visitor actions that are not predefined in the existing JavaScript Tracking Client API, allowing web analysts to accurately measure and analyze any domain.
#### Methods
* `trackEvent(category: string, action: string, name?: string, value?: number) ` - Tracks custom event, e.g. when visitor interacts with the page.

### Site search Service
Site search tracking gives you insight into how visitors interact with the search engine on your website - what they search for and how many results they get back.
#### Methods
* `trackSiteSearch(keyword: string, category?: string, searchCount?: number, dimensions?: Object)` - Tracks search requests on a website.

### E-Commerce Service
#### Methods
* `addEcommerceItem(productSKU: string, productName: string, productCategory: string | string[], productPrice: number, productQuantity: number)` - Adds a product to a virtual shopping cart. If a product with the same SKU is in the cart, it will be removed first. Does not send any data to the Collecting & Processing Pipeline.
* `removeEcommerceItem(productSKU: string)` - Removes a product with the provided SKU from a virtual shopping cart. If multiple units of that product are in the virtual cart, all of them will be removed. Does not send any data to the Collecting & Processing Pipeline.
* `clearEcommerceCart()` - Removes all items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline.
* `getEcommerceItems()` - Returns a copy of items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline
* `trackEcommerceOrder()` - Tracks a successfully placed e-commerce order with items present in a virtual cart (registered using addEcommerceItem).
* `trackEcommerceCartUpdate(cartAmount: number)` - Tracks items present in a virtual shopping cart (registered with addEcommerceItem)
* `setEcommerceView(productSKU: string, productName?: string, productCategory?: string[], productPrice?: string)` - Tracks product or category view. Must be followed by a page view.

### Content Tracking Service
Content Tracking allows you to track what content is visible on your site and how users interact with it.
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
At this point we have tracked many different types of events. We have regular page views, downloads, outlinks, custom events and others. Above them all there’s one more event type we can track: a conversion. And goal tracking is about tracking conversions. If you can point out parts of your website/application more important from your business perspective, you could define those parts as goals. Visiting a specific landing page, submitting a contact form, downloading a PDF file with your product manual - these are popular examples of goal definitions. You can even define a goal based on the custom event you are tracking.

* `trackGoal(goalId: number | string, conversionValue: number, dimensions?: Object)` - Tracks manual goal conversion.

### Custom Dimensions
* `setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string)`  - Sets a custom dimension to be used later.
* `deleteCustomDimension(customDimensionId: string)` - Removes a custom dimension with the specified ID.
* `getCustomDimensionValue(customDimensionId: string | number)` - Returns the value of a custom dimension with the specified ID.
