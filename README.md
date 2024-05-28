
<a name="readmemd"></a>

**@piwikpro/ngx-piwik-pro-project** • [**Docs**](#modulesmd)

***

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


<a name="modulesmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


## Modules

- [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd)


<a name="node_modulespiwikprotracking-base-librarydistinterfacesreadmemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***



## Index

### Interfaces

- [PiwikProWindow](#node_modulespiwikprotracking-base-librarydistinterfacesinterfacespiwikprowindowmd)

### Type Aliases

- [AnyData](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesanydatamd)
- [Dimensions](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesdimensionsmd)
- [LimitedArrayFiveStrings](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliaseslimitedarrayfivestringsmd)
- [PaymentInformation](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasespaymentinformationmd)
- [Product](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd)
- [QueueItem](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesqueueitemmd)


<a name="node_modulespiwikprotracking-base-librarydistinterfacesinterfacespiwikprowindowmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Interface: PiwikProWindow

## Properties

### IS\_DEBUG?

> `optional` **IS\_DEBUG**: `boolean`

***

### \_paq?

> `optional` **\_paq**: [`QueueItem`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesqueueitemmd)[]

***

### dataLayer?

> `optional` **dataLayer**: `any`[]


<a name="node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesanydatamd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Type alias: AnyData

> **AnyData**: `any`


<a name="node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesdimensionsmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Type alias: Dimensions

> **Dimensions**: `Record`\<\`dimension$\{number\}\`, `string`\>


<a name="node_modulespiwikprotracking-base-librarydistinterfacestype-aliaseslimitedarrayfivestringsmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Type alias: LimitedArrayFiveStrings

> **LimitedArrayFiveStrings**: [`string`, `...string[]`] \| [`string`, `string`, `string`, `string`, `string`]


<a name="node_modulespiwikprotracking-base-librarydistinterfacestype-aliasespaymentinformationmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Type alias: PaymentInformation

> **PaymentInformation**: `object`

## Type declaration

### discount?

> `optional` **discount**: `number` \| `string`

### grandTotal

> **grandTotal**: `number` \| `string`

### orderId

> **orderId**: `string`

### shipping?

> `optional` **shipping**: `number` \| `string`

### subTotal?

> `optional` **subTotal**: `number` \| `string`

### tax?

> `optional` **tax**: `number` \| `string`


<a name="node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Type alias: Product

> **Product**: `object`

## Type declaration

### brand?

> `optional` **brand**: `string`

### category?

> `optional` **category**: [`LimitedArrayFiveStrings`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliaseslimitedarrayfivestringsmd)

### customDimensions?

> `optional` **customDimensions**: `Record`\<`number`, `string`\>

### name?

> `optional` **name**: `string`

### price?

> `optional` **price**: `number`

### quantity?

> `optional` **quantity**: `number`

### sku

> **sku**: `string`

### variant?

> `optional` **variant**: `string`


<a name="node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesqueueitemmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***


# Type alias: QueueItem

> **QueueItem**: [`TRACK_EVENT`, `...unknown[]`] \| [(`this`) => `void`]


<a name="projectsngx-piwik-prosrcpublic-apireadmemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / projects/ngx-piwik-pro/src/public-api

# projects/ngx-piwik-pro/src/public-api

## Index

### Enumerations

- [CustomVariableScope](#projectsngx-piwik-prosrcpublic-apienumerationscustomvariablescopemd)
- [TRACK\_EVENT](#projectsngx-piwik-prosrcpublic-apienumerationstrack_eventmd)

### Classes

- [ContentTrackingService](#projectsngx-piwik-prosrcpublic-apiclassescontenttrackingservicemd)
- [CookieManagementService](#projectsngx-piwik-prosrcpublic-apiclassescookiemanagementservicemd)
- [CustomDimensionsService](#projectsngx-piwik-prosrcpublic-apiclassescustomdimensionsservicemd)
- [CustomEventsService](#projectsngx-piwik-prosrcpublic-apiclassescustomeventsservicemd)
- [DataLayerService](#projectsngx-piwik-prosrcpublic-apiclassesdatalayerservicemd)
- [DownloadAndOutlinkService](#projectsngx-piwik-prosrcpublic-apiclassesdownloadandoutlinkservicemd)
- [ECommerceService](#projectsngx-piwik-prosrcpublic-apiclassesecommerceservicemd)
- [GoalConversionsService](#projectsngx-piwik-prosrcpublic-apiclassesgoalconversionsservicemd)
- [NgxPiwikProModule](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikpromodulemd)
- [NgxPiwikProRouterModule](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikproroutermodulemd)
- [PageViewsService](#projectsngx-piwik-prosrcpublic-apiclassespageviewsservicemd)
- [PaqService](#projectsngx-piwik-prosrcpublic-apiclassespaqservicemd)
- [SiteSearchService](#projectsngx-piwik-prosrcpublic-apiclassessitesearchservicemd)
- [UserManagementService](#projectsngx-piwik-prosrcpublic-apiclassesusermanagementservicemd)

### Interfaces

- [PiwikProRoutingSettings](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikproroutingsettingsmd)
- [PiwikProSettings](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprosettingsmd)
- [PiwikProWindow](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprowindowmd)

### Type Aliases

- [DataLayer](#projectsngx-piwik-prosrcpublic-apitype-aliasesdatalayermd)
- [Paq](#projectsngx-piwik-prosrcpublic-apitype-aliasespaqmd)

### Variables

- [NGX\_PAQ](#projectsngx-piwik-prosrcpublic-apivariablesngx_paqmd)
- [NGX\_PIWIK\_PRO\_INITIALIZER\_PROVIDER](#projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_initializer_providermd)
- [NGX\_PIWIK\_PRO\_ROUTER\_INITIALIZER\_PROVIDER](#projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_router_initializer_providermd)
- [NGX\_PIWIK\_PRO\_ROUTING\_SETTINGS\_TOKEN](#projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_routing_settings_tokenmd)
- [NGX\_PIWIK\_PRO\_SETTINGS\_TOKEN](#projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_settings_tokenmd)
- [NGX\_WINDOW](#projectsngx-piwik-prosrcpublic-apivariablesngx_windowmd)


- [PiwikProInitializer](#projectsngx-piwik-prosrcpublic-apifunctionspiwikproinitializermd)
- [PiwikProRouterInitializer](#projectsngx-piwik-prosrcpublic-apifunctionspiwikprorouterinitializermd)
- [getPaqFn](#projectsngx-piwik-prosrcpublic-apifunctionsgetpaqfnmd)


<a name="projectsngx-piwik-prosrcpublic-apiclassescontenttrackingservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / ContentTrackingService

# Class: ContentTrackingService

## Constructors

### new ContentTrackingService()

> **new ContentTrackingService**(): [`ContentTrackingService`](#projectsngx-piwik-prosrcpublic-apiclassescontenttrackingservicemd)

#### Returns

[`ContentTrackingService`](#projectsngx-piwik-prosrcpublic-apiclassescontenttrackingservicemd)

## Methods

### logAllContentBlocksOnPage()

> **logAllContentBlocksOnPage**(): `void`

#### Returns

`void`

***

### trackAllContentImpressions()

> **trackAllContentImpressions**(): `void`

#### Returns

`void`

***

### trackContentImpression()

> **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

#### Parameters

• **contentName**: `string`

• **contentPiece**: `string`

• **contentTarget**: `string`

#### Returns

`void`

***

### trackContentImpressionsWithinNode()

> **trackContentImpressionsWithinNode**(`domNode`): `void`

#### Parameters

• **domNode**: `Node`

#### Returns

`void`

***

### trackContentInteraction()

> **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

#### Parameters

• **contentInteraction**: `string`

• **contentName**: `string`

• **contentPiece**: `string`

• **contentTarget**: `string`

#### Returns

`void`

***

### trackContentInteractionNode()

> **trackContentInteractionNode**(`domNode`, `contentInteraction`): `void`

#### Parameters

• **domNode**: `Node`

• **contentInteraction**: `string`= `'Unknown'`

#### Returns

`void`

***

### trackVisibleContentImpressions()

> **trackVisibleContentImpressions**(`checkOnScroll`, `watchInterval`): `void`

#### Parameters

• **checkOnScroll**: `boolean`= `true`

• **watchInterval**: `number`= `750`

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassescookiemanagementservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / CookieManagementService

# Class: CookieManagementService

## Constructors

### new CookieManagementService()

> **new CookieManagementService**(): [`CookieManagementService`](#projectsngx-piwik-prosrcpublic-apiclassescookiemanagementservicemd)

#### Returns

[`CookieManagementService`](#projectsngx-piwik-prosrcpublic-apiclassescookiemanagementservicemd)

## Methods

### deleteCookies()

> **deleteCookies**(): `void`

#### Returns

`void`

***

### disableCookies()

> **disableCookies**(): `void`

#### Returns

`void`

***

### enableCookies()

> **enableCookies**(): `void`

#### Returns

`void`

***

### hasCookies()

> **hasCookies**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

***

### setCookieDomain()

> **setCookieDomain**(`domain`): `void`

#### Parameters

• **domain**: `string`

#### Returns

`void`

***

### setCookieNamePrefix()

> **setCookieNamePrefix**(`prefix`): `void`

#### Parameters

• **prefix**: `string`

#### Returns

`void`

***

### setCookiePath()

> **setCookiePath**(`path`): `void`

#### Parameters

• **path**: `string`

#### Returns

`void`

***

### setSecureCookie()

> **setSecureCookie**(`secure`): `void`

#### Parameters

• **secure**: `boolean`

#### Returns

`void`

***

### setSessionCookieTimeout()

> **setSessionCookieTimeout**(`seconds`): `void`

#### Parameters

• **seconds**: `number`

#### Returns

`void`

***

### setVisitorCookieTimeout()

> **setVisitorCookieTimeout**(`seconds`): `void`

#### Parameters

• **seconds**: `number`

#### Returns

`void`

***

### setVisitorIdCookie()

> **setVisitorIdCookie**(): `void`

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassescustomdimensionsservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / CustomDimensionsService

# Class: CustomDimensionsService

## Constructors

### new CustomDimensionsService()

> **new CustomDimensionsService**(): [`CustomDimensionsService`](#projectsngx-piwik-prosrcpublic-apiclassescustomdimensionsservicemd)

#### Returns

[`CustomDimensionsService`](#projectsngx-piwik-prosrcpublic-apiclassescustomdimensionsservicemd)

## Methods

### deleteCustomDimension()

> **deleteCustomDimension**(`customDimensionId`): `void`

#### Parameters

• **customDimensionId**: `string`

#### Returns

`void`

***

### getCustomDimensionValue()

> **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`undefined` \| `string`\>

#### Parameters

• **customDimensionId**: `string` \| `number`

#### Returns

`Promise`\<`undefined` \| `string`\>

***

### setCustomDimensionValue()

> **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

#### Parameters

• **customDimensionId**: `string` \| `number`

• **customDimensionValue**: `string`

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassescustomeventsservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / CustomEventsService

# Class: CustomEventsService

## Constructors

### new CustomEventsService()

> **new CustomEventsService**(): [`CustomEventsService`](#projectsngx-piwik-prosrcpublic-apiclassescustomeventsservicemd)

#### Returns

[`CustomEventsService`](#projectsngx-piwik-prosrcpublic-apiclassescustomeventsservicemd)

## Methods

### trackEvent()

> **trackEvent**(`category`, `action`, `name`?, `value`?): `void`

#### Parameters

• **category**: `string`

• **action**: `string`

• **name?**: `string`

• **value?**: `number`

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassesdatalayerservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / DataLayerService

# Class: DataLayerService

## Constructors

### new DataLayerService()

> **new DataLayerService**(): [`DataLayerService`](#projectsngx-piwik-prosrcpublic-apiclassesdatalayerservicemd)

#### Returns

[`DataLayerService`](#projectsngx-piwik-prosrcpublic-apiclassesdatalayerservicemd)

## Methods

### push()

> **push**(`data`): `number`

#### Parameters

• **data**: `any`

#### Returns

`number`


<a name="projectsngx-piwik-prosrcpublic-apiclassesdownloadandoutlinkservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / DownloadAndOutlinkService

# Class: DownloadAndOutlinkService

## Constructors

### new DownloadAndOutlinkService()

> **new DownloadAndOutlinkService**(): [`DownloadAndOutlinkService`](#projectsngx-piwik-prosrcpublic-apiclassesdownloadandoutlinkservicemd)

#### Returns

[`DownloadAndOutlinkService`](#projectsngx-piwik-prosrcpublic-apiclassesdownloadandoutlinkservicemd)

## Methods

### addDownloadExtensions()

> **addDownloadExtensions**(`extensions`): `void`

#### Parameters

• **extensions**: `string`[]

#### Returns

`void`

***

### enableLinkTracking()

> **enableLinkTracking**(`enable`): `void`

#### Parameters

• **enable**: `boolean`

#### Returns

`void`

***

### getLinkTrackingTimer()

> **getLinkTrackingTimer**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

***

### removeDownloadExtensions()

> **removeDownloadExtensions**(`extensions`): `void`

#### Parameters

• **extensions**: `string`[]

#### Returns

`void`

***

### setDownloadClasses()

> **setDownloadClasses**(`classes`): `void`

#### Parameters

• **classes**: `string`[]

#### Returns

`void`

***

### setDownloadExtensions()

> **setDownloadExtensions**(`extensions`): `void`

#### Parameters

• **extensions**: `string`[]

#### Returns

`void`

***

### setIgnoreClasses()

> **setIgnoreClasses**(`classes`): `void`

#### Parameters

• **classes**: `string`[]

#### Returns

`void`

***

### setLinkClasses()

> **setLinkClasses**(`classes`): `void`

#### Parameters

• **classes**: `string`[]

#### Returns

`void`

***

### setLinkTrackingTimer()

> **setLinkTrackingTimer**(`time`): `void`

#### Parameters

• **time**: `number`

#### Returns

`void`

***

### trackLink()

> **trackLink**(`url`, `linkType`, `customData`?, `callback`?): `void`

#### Parameters

• **url**: `string`

• **linkType**: `string`

• **customData?**: [`Dimensions`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesdimensionsmd)

• **callback?**

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassesecommerceservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / ECommerceService

# Class: ECommerceService

## Constructors

### new ECommerceService()

> **new ECommerceService**(`paqService`): [`ECommerceService`](#projectsngx-piwik-prosrcpublic-apiclassesecommerceservicemd)

#### Parameters

• **paqService**: [`PaqService`](#projectsngx-piwik-prosrcpublic-apiclassespaqservicemd)

#### Returns

[`ECommerceService`](#projectsngx-piwik-prosrcpublic-apiclassesecommerceservicemd)

## Properties

### paqService

> `private` `readonly` **paqService**: [`PaqService`](#projectsngx-piwik-prosrcpublic-apiclassespaqservicemd)

## Methods

### ~~addEcommerceItem()~~

> **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

#### Parameters

• **productSKU**: `string`

• **productName**: `string`

• **productCategory**: `string` \| `string`[]

• **productPrice**: `number`

• **productQuantity**: `number`

#### Returns

`void`

#### Deprecated

Please use the ecommerceAddToCart instead.

***

### ~~clearEcommerceCart()~~

> **clearEcommerceCart**(): `void`

#### Returns

`void`

#### Deprecated

***

### ecommerceAddToCart()

> **ecommerceAddToCart**(`products`): `void`

#### Parameters

• **products**: [`Product`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd)[]

#### Returns

`void`

***

### ecommerceCartUpdate()

> **ecommerceCartUpdate**(`products`, `grandTotal`): `void`

#### Parameters

• **products**: [`Product`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd)[]

• **grandTotal**: `string` \| `number`

#### Returns

`void`

***

### ecommerceOrder()

> **ecommerceOrder**(`products`, `paymentInformation`): `void`

#### Parameters

• **products**: [`Product`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd)[]

• **paymentInformation**: [`PaymentInformation`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasespaymentinformationmd)

#### Returns

`void`

***

### ecommerceProductDetailView()

> **ecommerceProductDetailView**(`products`): `void`

#### Parameters

• **products**: [`Product`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd)[]

#### Returns

`void`

***

### ecommerceRemoveFromCart()

> **ecommerceRemoveFromCart**(`products`): `void`

#### Parameters

• **products**: [`Product`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesproductmd)[]

#### Returns

`void`

***

### ~~getEcommerceItems()~~

> **getEcommerceItems**(): `Promise`\<`object`\>

#### Returns

`Promise`\<`object`\>

#### Deprecated

***

### ~~removeEcommerceItem()~~

> **removeEcommerceItem**(`productSKU`): `void`

#### Parameters

• **productSKU**: `string`

#### Returns

`void`

#### Deprecated

Please use the ecommerceRemoveFromCart instead.

***

### ~~setEcommerceView()~~

> **setEcommerceView**(`productSKU`, `productName`?, `productCategory`?, `productPrice`?): `void`

#### Parameters

• **productSKU**: `string`

• **productName?**: `string`

• **productCategory?**: `string`[]

• **productPrice?**: `string`

#### Returns

`void`

#### Deprecated

***

### ~~trackEcommerceCartUpdate()~~

> **trackEcommerceCartUpdate**(`cartAmount`): `void`

#### Parameters

• **cartAmount**: `number`

#### Returns

`void`

#### Deprecated

Please use the ecommerceCartUpdate instead.

***

### ~~trackEcommerceOrder()~~

> **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal`?, `orderTax`?, `orderShipping`?, `orderDiscount`?): `void`

#### Parameters

• **orderId**: `string`

• **orderGrandTotal**: `number`

• **orderSubTotal?**: `number`

• **orderTax?**: `number`

• **orderShipping?**: `number`

• **orderDiscount?**: `number`

#### Returns

`void`

#### Deprecated

Please use the ecommerceOrder instead.


<a name="projectsngx-piwik-prosrcpublic-apiclassesgoalconversionsservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / GoalConversionsService

# Class: GoalConversionsService

## Constructors

### new GoalConversionsService()

> **new GoalConversionsService**(): [`GoalConversionsService`](#projectsngx-piwik-prosrcpublic-apiclassesgoalconversionsservicemd)

#### Returns

[`GoalConversionsService`](#projectsngx-piwik-prosrcpublic-apiclassesgoalconversionsservicemd)

## Methods

### trackGoal()

> **trackGoal**(`goalId`, `conversionValue`, `dimensions`?): `void`

#### Parameters

• **goalId**: `string` \| `number`

• **conversionValue**: `number`

• **dimensions?**: [`Dimensions`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesdimensionsmd)

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassesngxpiwikpromodulemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NgxPiwikProModule

# Class: NgxPiwikProModule

## Constructors

### new NgxPiwikProModule()

> **new NgxPiwikProModule**(): [`NgxPiwikProModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikpromodulemd)

#### Returns

[`NgxPiwikProModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikpromodulemd)

## Methods

### forRoot()

> `static` **forRoot**(`containerId`, `containerURL`, `nonce`?): `ModuleWithProviders`\<[`NgxPiwikProModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikpromodulemd)\>

#### Parameters

• **containerId**: `string`

• **containerURL**: `string`

• **nonce?**: `string`

#### Returns

`ModuleWithProviders`\<[`NgxPiwikProModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikpromodulemd)\>


<a name="projectsngx-piwik-prosrcpublic-apiclassesngxpiwikproroutermodulemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NgxPiwikProRouterModule

# Class: NgxPiwikProRouterModule

## Constructors

### new NgxPiwikProRouterModule()

> **new NgxPiwikProRouterModule**(): [`NgxPiwikProRouterModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikproroutermodulemd)

#### Returns

[`NgxPiwikProRouterModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikproroutermodulemd)

## Methods

### forRoot()

> `static` **forRoot**(`settings`?): `ModuleWithProviders`\<[`NgxPiwikProRouterModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikproroutermodulemd)\>

#### Parameters

• **settings?**: [`PiwikProRoutingSettings`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikproroutingsettingsmd)

#### Returns

`ModuleWithProviders`\<[`NgxPiwikProRouterModule`](#projectsngx-piwik-prosrcpublic-apiclassesngxpiwikproroutermodulemd)\>


<a name="projectsngx-piwik-prosrcpublic-apiclassespageviewsservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PageViewsService

# Class: PageViewsService

## Constructors

### new PageViewsService()

> **new PageViewsService**(): [`PageViewsService`](#projectsngx-piwik-prosrcpublic-apiclassespageviewsservicemd)

#### Returns

[`PageViewsService`](#projectsngx-piwik-prosrcpublic-apiclassespageviewsservicemd)

## Methods

### trackPageView()

> **trackPageView**(`customPageTitle`?): `void`

#### Parameters

• **customPageTitle?**: `string`

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassespaqservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PaqService

# Class: PaqService

## Constructors

### new PaqService()

> **new PaqService**(`titleService`, `routerService`, `_window`): [`PaqService`](#projectsngx-piwik-prosrcpublic-apiclassespaqservicemd)

#### Parameters

• **titleService**: `Title`

• **routerService**: `Router`

• **\_window**: [`PiwikProWindow`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprowindowmd)

#### Returns

[`PaqService`](#projectsngx-piwik-prosrcpublic-apiclassespaqservicemd)

## Properties

### \_window

> `private` `readonly` **\_window**: [`PiwikProWindow`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprowindowmd)

***

### routerService

> `private` `readonly` **routerService**: `Router`

***

### titleService

> `private` `readonly` **titleService**: `Title`

## Methods

### push()

> **push**(`collection`): `any`

#### Parameters

• **collection**: `any`[]

#### Returns

`any`


<a name="projectsngx-piwik-prosrcpublic-apiclassessitesearchservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / SiteSearchService

# Class: SiteSearchService

## Constructors

### new SiteSearchService()

> **new SiteSearchService**(): [`SiteSearchService`](#projectsngx-piwik-prosrcpublic-apiclassessitesearchservicemd)

#### Returns

[`SiteSearchService`](#projectsngx-piwik-prosrcpublic-apiclassessitesearchservicemd)

## Methods

### trackSiteSearch()

> **trackSiteSearch**(`keyword`, `category`?, `searchCount`?, `dimensions`?): `void`

#### Parameters

• **keyword**: `string`

• **category?**: `string`

• **searchCount?**: `number`

• **dimensions?**: [`Dimensions`](#node_modulespiwikprotracking-base-librarydistinterfacestype-aliasesdimensionsmd)

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apiclassesusermanagementservicemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / UserManagementService

# Class: UserManagementService

## Constructors

### new UserManagementService()

> **new UserManagementService**(): [`UserManagementService`](#projectsngx-piwik-prosrcpublic-apiclassesusermanagementservicemd)

#### Returns

[`UserManagementService`](#projectsngx-piwik-prosrcpublic-apiclassesusermanagementservicemd)

## Methods

### getUserId()

> **getUserId**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

***

### getVisitorId()

> **getVisitorId**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

***

### getVisitorInfo()

> **getVisitorInfo**(): `Promise`\<`any`[]\>

#### Returns

`Promise`\<`any`[]\>

***

### resetUserId()

> **resetUserId**(): `void`

#### Returns

`void`

***

### setUserId()

> **setUserId**(`userId`): `void`

#### Parameters

• **userId**: `string`

#### Returns

`void`


<a name="projectsngx-piwik-prosrcpublic-apienumerationscustomvariablescopemd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / CustomVariableScope

# Enumeration: CustomVariableScope

## Enumeration Members

### PAGE

> **PAGE**: `"page"`

***

### VISIT

> **VISIT**: `"visit"`


<a name="projectsngx-piwik-prosrcpublic-apienumerationstrack_eventmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / TRACK\_EVENT

# Enumeration: TRACK\_EVENT

## Enumeration Members

### ADD\_ECOMMERCE\_ITEM

> **ADD\_ECOMMERCE\_ITEM**: `"addEcommerceItem"`

***

### CLEAR\_ECOMMERCE\_CART

> **CLEAR\_ECOMMERCE\_CART**: `"clearEcommerceCart"`

***

### ORDER\_ECOMMERCE

> **ORDER\_ECOMMERCE**: `"trackEcommerceOrder"`

***

### REMOVE\_ECOMMERCE\_ITEM

> **REMOVE\_ECOMMERCE\_ITEM**: `"removeEcommerceItem"`

***

### SET\_ECOMMERCE\_VIEW

> **SET\_ECOMMERCE\_VIEW**: `"setEcommerceView"`

***

### UPDATE\_ECOMMERCE\_CART

> **UPDATE\_ECOMMERCE\_CART**: `"trackEcommerceCartUpdate"`


<a name="projectsngx-piwik-prosrcpublic-apifunctionspiwikproinitializermd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PiwikProInitializer

# Function: PiwikProInitializer()

> **PiwikProInitializer**(`settings`, `document`, `platformId`): () => `Promise`\<`void`\>

## Parameters

• **settings**: [`PiwikProSettings`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprosettingsmd)

• **document**: `Document`

• **platformId**: `string`

## Returns

`Function`

### Returns

`Promise`\<`void`\>


<a name="projectsngx-piwik-prosrcpublic-apifunctionspiwikprorouterinitializermd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PiwikProRouterInitializer

# Function: PiwikProRouterInitializer()

> **PiwikProRouterInitializer**(`settings`, `titleService`, `pageViewsService`): (`c`) => `Promise`\<`void`\>

## Parameters

• **settings**: [`PiwikProRoutingSettings`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikproroutingsettingsmd)

• **titleService**: `Title`

• **pageViewsService**: [`PageViewsService`](#projectsngx-piwik-prosrcpublic-apiclassespageviewsservicemd)

## Returns

`Function`

### Parameters

• **c**: `ComponentRef`\<`any`\>

### Returns

`Promise`\<`void`\>


<a name="projectsngx-piwik-prosrcpublic-apifunctionsgetpaqfnmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / getPaqFn

# Function: getPaqFn()

> **getPaqFn**(`window`): `any`

Check if there is some global function called _paq on Window object, or create an empty function to doesn't brake codes...

## Parameters

• **window**: [`PiwikProWindow`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprowindowmd)

## Returns

`any`


<a name="projectsngx-piwik-prosrcpublic-apiinterfacespiwikproroutingsettingsmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PiwikProRoutingSettings

# Interface: PiwikProRoutingSettings

## Properties

### exclude?

> `optional` **exclude**: (`string` \| `RegExp`)[]

***

### include?

> `optional` **include**: (`string` \| `RegExp`)[]

***

### skipFirstPageView?

> `optional` **skipFirstPageView**: `boolean`


<a name="projectsngx-piwik-prosrcpublic-apiinterfacespiwikprosettingsmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PiwikProSettings

# Interface: PiwikProSettings

## Properties

### containerId

> **containerId**: `string`

***

### containerURL

> **containerURL**: `string`

***

### nonce?

> `optional` **nonce**: `string`


<a name="projectsngx-piwik-prosrcpublic-apiinterfacespiwikprowindowmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / PiwikProWindow

# Interface: PiwikProWindow

## Extends

- `Window`

## Properties

### \_paq?

> `optional` **\_paq**: `any`

#### Overrides

`Window._paq`

***

### caches

> `readonly` **caches**: `CacheStorage`

Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/caches)

#### Inherited from

`Window.caches`

***

### ~~clientInformation~~

> `readonly` **clientInformation**: `Navigator`

#### Deprecated

This is a legacy alias of `navigator`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/navigator)

#### Inherited from

`Window.clientInformation`

***

### closed

> `readonly` **closed**: `boolean`

Returns true if the window has been closed, false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/closed)

#### Inherited from

`Window.closed`

***

### crossOriginIsolated

> `readonly` **crossOriginIsolated**: `boolean`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/crossOriginIsolated)

#### Inherited from

`Window.crossOriginIsolated`

***

### crypto

> `readonly` **crypto**: `Crypto`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/crypto_property)

#### Inherited from

`Window.crypto`

***

### customElements

> `readonly` **customElements**: `CustomElementRegistry`

Defines a new custom element, mapping the given name to the given constructor as an autonomous custom element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/customElements)

#### Inherited from

`Window.customElements`

***

### dataLayer?

> `optional` **dataLayer**: `any`

***

### devicePixelRatio

> `readonly` **devicePixelRatio**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/devicePixelRatio)

#### Inherited from

`Window.devicePixelRatio`

***

### document

> `readonly` **document**: `Document`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/document)

#### Inherited from

`Window.document`

***

### ~~event~~

> `readonly` **event**: `undefined` \| `Event`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/event)

#### Inherited from

`Window.event`

***

### ~~external~~

> `readonly` **external**: `External`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/external)

#### Inherited from

`Window.external`

***

### frameElement

> `readonly` **frameElement**: `null` \| `Element`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/frameElement)

#### Inherited from

`Window.frameElement`

***

### frames

> `readonly` **frames**: `Window`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/frames)

#### Inherited from

`Window.frames`

***

### history

> `readonly` **history**: `History`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/history)

#### Inherited from

`Window.history`

***

### indexedDB

> `readonly` **indexedDB**: `IDBFactory`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/indexedDB)

#### Inherited from

`Window.indexedDB`

***

### innerHeight

> `readonly` **innerHeight**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/innerHeight)

#### Inherited from

`Window.innerHeight`

***

### innerWidth

> `readonly` **innerWidth**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/innerWidth)

#### Inherited from

`Window.innerWidth`

***

### isSecureContext

> `readonly` **isSecureContext**: `boolean`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/isSecureContext)

#### Inherited from

`Window.isSecureContext`

***

### length

> `readonly` **length**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/length)

#### Inherited from

`Window.length`

***

### localStorage

> `readonly` **localStorage**: `Storage`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/localStorage)

#### Inherited from

`Window.localStorage`

***

### locationbar

> `readonly` **locationbar**: `BarProp`

Returns true if the location bar is visible; otherwise, returns false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/locationbar)

#### Inherited from

`Window.locationbar`

***

### menubar

> `readonly` **menubar**: `BarProp`

Returns true if the menu bar is visible; otherwise, returns false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/menubar)

#### Inherited from

`Window.menubar`

***

### name

> **name**: `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/name)

#### Inherited from

`Window.name`

***

### navigator

> `readonly` **navigator**: `Navigator`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/navigator)

#### Inherited from

`Window.navigator`

***

### onabort

> **onabort**: `null` \| (`this`, `ev`) => `any`

Fires when the user aborts the download.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event)

#### Inherited from

`Window.onabort`

***

### onafterprint

> **onafterprint**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/afterprint_event)

#### Inherited from

`Window.onafterprint`

***

### onanimationcancel

> **onanimationcancel**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event)

#### Inherited from

`Window.onanimationcancel`

***

### onanimationend

> **onanimationend**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)

#### Inherited from

`Window.onanimationend`

***

### onanimationiteration

> **onanimationiteration**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)

#### Inherited from

`Window.onanimationiteration`

***

### onanimationstart

> **onanimationstart**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)

#### Inherited from

`Window.onanimationstart`

***

### onauxclick

> **onauxclick**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/auxclick_event)

#### Inherited from

`Window.onauxclick`

***

### onbeforeinput

> **onbeforeinput**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforeinput_event)

#### Inherited from

`Window.onbeforeinput`

***

### onbeforeprint

> **onbeforeprint**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/beforeprint_event)

#### Inherited from

`Window.onbeforeprint`

***

### onbeforetoggle

> **onbeforetoggle**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/beforetoggle_event)

#### Inherited from

`Window.onbeforetoggle`

***

### onbeforeunload

> **onbeforeunload**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/beforeunload_event)

#### Inherited from

`Window.onbeforeunload`

***

### onblur

> **onblur**: `null` \| (`this`, `ev`) => `any`

Fires when the object loses the input focus.

#### Param

The focus event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/blur_event)

#### Inherited from

`Window.onblur`

***

### oncancel

> **oncancel**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event)

#### Inherited from

`Window.oncancel`

***

### oncanplay

> **oncanplay**: `null` \| (`this`, `ev`) => `any`

Occurs when playback is possible, but would require further buffering.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event)

#### Inherited from

`Window.oncanplay`

***

### oncanplaythrough

> **oncanplaythrough**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event)

#### Inherited from

`Window.oncanplaythrough`

***

### onchange

> **onchange**: `null` \| (`this`, `ev`) => `any`

Fires when the contents of the object or selection have changed.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)

#### Inherited from

`Window.onchange`

***

### onclick

> **onclick**: `null` \| (`this`, `ev`) => `any`

Fires when the user clicks the left mouse button on the object

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/click_event)

#### Inherited from

`Window.onclick`

***

### onclose

> **onclose**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event)

#### Inherited from

`Window.onclose`

***

### oncontextmenu

> **oncontextmenu**: `null` \| (`this`, `ev`) => `any`

Fires when the user clicks the right mouse button in the client area, opening the context menu.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event)

#### Inherited from

`Window.oncontextmenu`

***

### oncopy

> **oncopy**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/copy_event)

#### Inherited from

`Window.oncopy`

***

### oncuechange

> **oncuechange**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/cuechange_event)

#### Inherited from

`Window.oncuechange`

***

### oncut

> **oncut**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/cut_event)

#### Inherited from

`Window.oncut`

***

### ondblclick

> **ondblclick**: `null` \| (`this`, `ev`) => `any`

Fires when the user double-clicks the object.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/dblclick_event)

#### Inherited from

`Window.ondblclick`

***

### ondevicemotion

> **ondevicemotion**: `null` \| (`this`, `ev`) => `any`

Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/devicemotion_event)

#### Inherited from

`Window.ondevicemotion`

***

### ondeviceorientation

> **ondeviceorientation**: `null` \| (`this`, `ev`) => `any`

Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/deviceorientation_event)

#### Inherited from

`Window.ondeviceorientation`

***

### ondeviceorientationabsolute

> **ondeviceorientationabsolute**: `null` \| (`this`, `ev`) => `any`

Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/deviceorientationabsolute_event)

#### Inherited from

`Window.ondeviceorientationabsolute`

***

### ondrag

> **ondrag**: `null` \| (`this`, `ev`) => `any`

Fires on the source object continuously during a drag operation.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event)

#### Inherited from

`Window.ondrag`

***

### ondragend

> **ondragend**: `null` \| (`this`, `ev`) => `any`

Fires on the source object when the user releases the mouse at the close of a drag operation.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event)

#### Inherited from

`Window.ondragend`

***

### ondragenter

> **ondragenter**: `null` \| (`this`, `ev`) => `any`

Fires on the target element when the user drags the object to a valid drop target.

#### Param

The drag event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event)

#### Inherited from

`Window.ondragenter`

***

### ondragleave

> **ondragleave**: `null` \| (`this`, `ev`) => `any`

Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.

#### Param

The drag event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event)

#### Inherited from

`Window.ondragleave`

***

### ondragover

> **ondragover**: `null` \| (`this`, `ev`) => `any`

Fires on the target element continuously while the user drags the object over a valid drop target.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event)

#### Inherited from

`Window.ondragover`

***

### ondragstart

> **ondragstart**: `null` \| (`this`, `ev`) => `any`

Fires on the source object when the user starts to drag a text selection or selected object.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event)

#### Inherited from

`Window.ondragstart`

***

### ondrop

> **ondrop**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event)

#### Inherited from

`Window.ondrop`

***

### ondurationchange

> **ondurationchange**: `null` \| (`this`, `ev`) => `any`

Occurs when the duration attribute is updated.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event)

#### Inherited from

`Window.ondurationchange`

***

### onemptied

> **onemptied**: `null` \| (`this`, `ev`) => `any`

Occurs when the media element is reset to its initial state.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event)

#### Inherited from

`Window.onemptied`

***

### onended

> **onended**: `null` \| (`this`, `ev`) => `any`

Occurs when the end of playback is reached.

#### Param

The event

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event)

#### Inherited from

`Window.onended`

***

### onerror

> **onerror**: `OnErrorEventHandler`

Fires when an error occurs during object loading.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event)

#### Inherited from

`Window.onerror`

***

### onfocus

> **onfocus**: `null` \| (`this`, `ev`) => `any`

Fires when the object receives focus.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focus_event)

#### Inherited from

`Window.onfocus`

***

### onformdata

> **onformdata**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event)

#### Inherited from

`Window.onformdata`

***

### ongamepadconnected

> **ongamepadconnected**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/gamepadconnected_event)

#### Inherited from

`Window.ongamepadconnected`

***

### ongamepaddisconnected

> **ongamepaddisconnected**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/gamepaddisconnected_event)

#### Inherited from

`Window.ongamepaddisconnected`

***

### ongotpointercapture

> **ongotpointercapture**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event)

#### Inherited from

`Window.ongotpointercapture`

***

### onhashchange

> **onhashchange**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/hashchange_event)

#### Inherited from

`Window.onhashchange`

***

### oninput

> **oninput**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/input_event)

#### Inherited from

`Window.oninput`

***

### oninvalid

> **oninvalid**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/invalid_event)

#### Inherited from

`Window.oninvalid`

***

### onkeydown

> **onkeydown**: `null` \| (`this`, `ev`) => `any`

Fires when the user presses a key.

#### Param

The keyboard event

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keydown_event)

#### Inherited from

`Window.onkeydown`

***

### ~~onkeypress~~

> **onkeypress**: `null` \| (`this`, `ev`) => `any`

Fires when the user presses an alphanumeric key.

#### Param

The event.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keypress_event)

#### Inherited from

`Window.onkeypress`

***

### onkeyup

> **onkeyup**: `null` \| (`this`, `ev`) => `any`

Fires when the user releases a key.

#### Param

The keyboard event

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keyup_event)

#### Inherited from

`Window.onkeyup`

***

### onlanguagechange

> **onlanguagechange**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/languagechange_event)

#### Inherited from

`Window.onlanguagechange`

***

### onload

> **onload**: `null` \| (`this`, `ev`) => `any`

Fires immediately after the browser loads the object.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement/load_event)

#### Inherited from

`Window.onload`

***

### onloadeddata

> **onloadeddata**: `null` \| (`this`, `ev`) => `any`

Occurs when media data is loaded at the current playback position.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event)

#### Inherited from

`Window.onloadeddata`

***

### onloadedmetadata

> **onloadedmetadata**: `null` \| (`this`, `ev`) => `any`

Occurs when the duration and dimensions of the media have been determined.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event)

#### Inherited from

`Window.onloadedmetadata`

***

### onloadstart

> **onloadstart**: `null` \| (`this`, `ev`) => `any`

Occurs when Internet Explorer begins looking for media data.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadstart_event)

#### Inherited from

`Window.onloadstart`

***

### onlostpointercapture

> **onlostpointercapture**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/lostpointercapture_event)

#### Inherited from

`Window.onlostpointercapture`

***

### onmessage

> **onmessage**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/message_event)

#### Inherited from

`Window.onmessage`

***

### onmessageerror

> **onmessageerror**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/messageerror_event)

#### Inherited from

`Window.onmessageerror`

***

### onmousedown

> **onmousedown**: `null` \| (`this`, `ev`) => `any`

Fires when the user clicks the object with either mouse button.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousedown_event)

#### Inherited from

`Window.onmousedown`

***

### onmouseenter

> **onmouseenter**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event)

#### Inherited from

`Window.onmouseenter`

***

### onmouseleave

> **onmouseleave**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event)

#### Inherited from

`Window.onmouseleave`

***

### onmousemove

> **onmousemove**: `null` \| (`this`, `ev`) => `any`

Fires when the user moves the mouse over the object.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousemove_event)

#### Inherited from

`Window.onmousemove`

***

### onmouseout

> **onmouseout**: `null` \| (`this`, `ev`) => `any`

Fires when the user moves the mouse pointer outside the boundaries of the object.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseout_event)

#### Inherited from

`Window.onmouseout`

***

### onmouseover

> **onmouseover**: `null` \| (`this`, `ev`) => `any`

Fires when the user moves the mouse pointer into the object.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseover_event)

#### Inherited from

`Window.onmouseover`

***

### onmouseup

> **onmouseup**: `null` \| (`this`, `ev`) => `any`

Fires when the user releases a mouse button while the mouse is over the object.

#### Param

The mouse event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseup_event)

#### Inherited from

`Window.onmouseup`

***

### onoffline

> **onoffline**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/offline_event)

#### Inherited from

`Window.onoffline`

***

### ononline

> **ononline**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/online_event)

#### Inherited from

`Window.ononline`

***

### ~~onorientationchange~~

> **onorientationchange**: `null` \| (`this`, `ev`) => `any`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/orientationchange_event)

#### Inherited from

`Window.onorientationchange`

***

### onpagehide

> **onpagehide**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/pagehide_event)

#### Inherited from

`Window.onpagehide`

***

### onpageshow

> **onpageshow**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/pageshow_event)

#### Inherited from

`Window.onpageshow`

***

### onpaste

> **onpaste**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/paste_event)

#### Inherited from

`Window.onpaste`

***

### onpause

> **onpause**: `null` \| (`this`, `ev`) => `any`

Occurs when playback is paused.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event)

#### Inherited from

`Window.onpause`

***

### onplay

> **onplay**: `null` \| (`this`, `ev`) => `any`

Occurs when the play method is requested.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event)

#### Inherited from

`Window.onplay`

***

### onplaying

> **onplaying**: `null` \| (`this`, `ev`) => `any`

Occurs when the audio or video has started playing.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event)

#### Inherited from

`Window.onplaying`

***

### onpointercancel

> **onpointercancel**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event)

#### Inherited from

`Window.onpointercancel`

***

### onpointerdown

> **onpointerdown**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event)

#### Inherited from

`Window.onpointerdown`

***

### onpointerenter

> **onpointerenter**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event)

#### Inherited from

`Window.onpointerenter`

***

### onpointerleave

> **onpointerleave**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event)

#### Inherited from

`Window.onpointerleave`

***

### onpointermove

> **onpointermove**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointermove_event)

#### Inherited from

`Window.onpointermove`

***

### onpointerout

> **onpointerout**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerout_event)

#### Inherited from

`Window.onpointerout`

***

### onpointerover

> **onpointerover**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerover_event)

#### Inherited from

`Window.onpointerover`

***

### onpointerup

> **onpointerup**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerup_event)

#### Inherited from

`Window.onpointerup`

***

### onpopstate

> **onpopstate**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/popstate_event)

#### Inherited from

`Window.onpopstate`

***

### onprogress

> **onprogress**: `null` \| (`this`, `ev`) => `any`

Occurs to indicate progress while downloading media data.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/progress_event)

#### Inherited from

`Window.onprogress`

***

### onratechange

> **onratechange**: `null` \| (`this`, `ev`) => `any`

Occurs when the playback rate is increased or decreased.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event)

#### Inherited from

`Window.onratechange`

***

### onrejectionhandled

> **onrejectionhandled**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/rejectionhandled_event)

#### Inherited from

`Window.onrejectionhandled`

***

### onreset

> **onreset**: `null` \| (`this`, `ev`) => `any`

Fires when the user resets a form.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event)

#### Inherited from

`Window.onreset`

***

### onresize

> **onresize**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/resize_event)

#### Inherited from

`Window.onresize`

***

### onscroll

> **onscroll**: `null` \| (`this`, `ev`) => `any`

Fires when the user repositions the scroll box in the scroll bar on the object.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scroll_event)

#### Inherited from

`Window.onscroll`

***

### onscrollend

> **onscrollend**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scrollend_event)

#### Inherited from

`Window.onscrollend`

***

### onsecuritypolicyviolation

> **onsecuritypolicyviolation**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/securitypolicyviolation_event)

#### Inherited from

`Window.onsecuritypolicyviolation`

***

### onseeked

> **onseeked**: `null` \| (`this`, `ev`) => `any`

Occurs when the seek operation ends.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event)

#### Inherited from

`Window.onseeked`

***

### onseeking

> **onseeking**: `null` \| (`this`, `ev`) => `any`

Occurs when the current playback position is moved.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event)

#### Inherited from

`Window.onseeking`

***

### onselect

> **onselect**: `null` \| (`this`, `ev`) => `any`

Fires when the current selection changes.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event)

#### Inherited from

`Window.onselect`

***

### onselectionchange

> **onselectionchange**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/selectionchange_event)

#### Inherited from

`Window.onselectionchange`

***

### onselectstart

> **onselectstart**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/selectstart_event)

#### Inherited from

`Window.onselectstart`

***

### onslotchange

> **onslotchange**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event)

#### Inherited from

`Window.onslotchange`

***

### onstalled

> **onstalled**: `null` \| (`this`, `ev`) => `any`

Occurs when the download has stopped.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event)

#### Inherited from

`Window.onstalled`

***

### onstorage

> **onstorage**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/storage_event)

#### Inherited from

`Window.onstorage`

***

### onsubmit

> **onsubmit**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event)

#### Inherited from

`Window.onsubmit`

***

### onsuspend

> **onsuspend**: `null` \| (`this`, `ev`) => `any`

Occurs if the load operation has been intentionally halted.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event)

#### Inherited from

`Window.onsuspend`

***

### ontimeupdate

> **ontimeupdate**: `null` \| (`this`, `ev`) => `any`

Occurs to indicate the current playback position.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event)

#### Inherited from

`Window.ontimeupdate`

***

### ontoggle

> **ontoggle**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement/toggle_event)

#### Inherited from

`Window.ontoggle`

***

### ontouchcancel?

> `optional` **ontouchcancel**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchcancel_event)

#### Inherited from

`Window.ontouchcancel`

***

### ontouchend?

> `optional` **ontouchend**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchend_event)

#### Inherited from

`Window.ontouchend`

***

### ontouchmove?

> `optional` **ontouchmove**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchmove_event)

#### Inherited from

`Window.ontouchmove`

***

### ontouchstart?

> `optional` **ontouchstart**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchstart_event)

#### Inherited from

`Window.ontouchstart`

***

### ontransitioncancel

> **ontransitioncancel**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event)

#### Inherited from

`Window.ontransitioncancel`

***

### ontransitionend

> **ontransitionend**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)

#### Inherited from

`Window.ontransitionend`

***

### ontransitionrun

> **ontransitionrun**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event)

#### Inherited from

`Window.ontransitionrun`

***

### ontransitionstart

> **ontransitionstart**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event)

#### Inherited from

`Window.ontransitionstart`

***

### onunhandledrejection

> **onunhandledrejection**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/unhandledrejection_event)

#### Inherited from

`Window.onunhandledrejection`

***

### ~~onunload~~

> **onunload**: `null` \| (`this`, `ev`) => `any`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/unload_event)

#### Inherited from

`Window.onunload`

***

### onvolumechange

> **onvolumechange**: `null` \| (`this`, `ev`) => `any`

Occurs when the volume is changed, or playback is muted or unmuted.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event)

#### Inherited from

`Window.onvolumechange`

***

### onwaiting

> **onwaiting**: `null` \| (`this`, `ev`) => `any`

Occurs when playback stops because the next frame of a video resource is not available.

#### Param

The event.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event)

#### Inherited from

`Window.onwaiting`

***

### ~~onwebkitanimationend~~

> **onwebkitanimationend**: `null` \| (`this`, `ev`) => `any`

#### Deprecated

This is a legacy alias of `onanimationend`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)

#### Inherited from

`Window.onwebkitanimationend`

***

### ~~onwebkitanimationiteration~~

> **onwebkitanimationiteration**: `null` \| (`this`, `ev`) => `any`

#### Deprecated

This is a legacy alias of `onanimationiteration`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)

#### Inherited from

`Window.onwebkitanimationiteration`

***

### ~~onwebkitanimationstart~~

> **onwebkitanimationstart**: `null` \| (`this`, `ev`) => `any`

#### Deprecated

This is a legacy alias of `onanimationstart`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)

#### Inherited from

`Window.onwebkitanimationstart`

***

### ~~onwebkittransitionend~~

> **onwebkittransitionend**: `null` \| (`this`, `ev`) => `any`

#### Deprecated

This is a legacy alias of `ontransitionend`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)

#### Inherited from

`Window.onwebkittransitionend`

***

### onwheel

> **onwheel**: `null` \| (`this`, `ev`) => `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/wheel_event)

#### Inherited from

`Window.onwheel`

***

### opener

> **opener**: `any`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/opener)

#### Inherited from

`Window.opener`

***

### ~~orientation~~

> `readonly` **orientation**: `number`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/orientation)

#### Inherited from

`Window.orientation`

***

### origin

> `readonly` **origin**: `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/origin)

#### Inherited from

`Window.origin`

***

### outerHeight

> `readonly` **outerHeight**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/outerHeight)

#### Inherited from

`Window.outerHeight`

***

### outerWidth

> `readonly` **outerWidth**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/outerWidth)

#### Inherited from

`Window.outerWidth`

***

### ~~pageXOffset~~

> `readonly` **pageXOffset**: `number`

#### Deprecated

This is a legacy alias of `scrollX`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollX)

#### Inherited from

`Window.pageXOffset`

***

### ~~pageYOffset~~

> `readonly` **pageYOffset**: `number`

#### Deprecated

This is a legacy alias of `scrollY`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollY)

#### Inherited from

`Window.pageYOffset`

***

### parent

> `readonly` **parent**: `Window`

Refers to either the parent WindowProxy, or itself.

It can rarely be null e.g. for contentWindow of an iframe that is already removed from the parent.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/parent)

#### Inherited from

`Window.parent`

***

### performance

> `readonly` **performance**: `Performance`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/performance_property)

#### Inherited from

`Window.performance`

***

### personalbar

> `readonly` **personalbar**: `BarProp`

Returns true if the personal bar is visible; otherwise, returns false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/personalbar)

#### Inherited from

`Window.personalbar`

***

### screen

> `readonly` **screen**: `Screen`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/screen)

#### Inherited from

`Window.screen`

***

### screenLeft

> `readonly` **screenLeft**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/screenLeft)

#### Inherited from

`Window.screenLeft`

***

### screenTop

> `readonly` **screenTop**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/screenTop)

#### Inherited from

`Window.screenTop`

***

### screenX

> `readonly` **screenX**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/screenX)

#### Inherited from

`Window.screenX`

***

### screenY

> `readonly` **screenY**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/screenY)

#### Inherited from

`Window.screenY`

***

### scrollX

> `readonly` **scrollX**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollX)

#### Inherited from

`Window.scrollX`

***

### scrollY

> `readonly` **scrollY**: `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollY)

#### Inherited from

`Window.scrollY`

***

### scrollbars

> `readonly` **scrollbars**: `BarProp`

Returns true if the scrollbars are visible; otherwise, returns false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollbars)

#### Inherited from

`Window.scrollbars`

***

### self

> `readonly` **self**: `Window` & *typeof* `globalThis`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/self)

#### Inherited from

`Window.self`

***

### sessionStorage

> `readonly` **sessionStorage**: `Storage`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/sessionStorage)

#### Inherited from

`Window.sessionStorage`

***

### speechSynthesis

> `readonly` **speechSynthesis**: `SpeechSynthesis`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/speechSynthesis)

#### Inherited from

`Window.speechSynthesis`

***

### ~~status~~

> **status**: `string`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/status)

#### Inherited from

`Window.status`

***

### statusbar

> `readonly` **statusbar**: `BarProp`

Returns true if the status bar is visible; otherwise, returns false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/statusbar)

#### Inherited from

`Window.statusbar`

***

### toolbar

> `readonly` **toolbar**: `BarProp`

Returns true if the toolbar is visible; otherwise, returns false.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/toolbar)

#### Inherited from

`Window.toolbar`

***

### top

> `readonly` **top**: `null` \| `Window`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/top)

#### Inherited from

`Window.top`

***

### visualViewport

> `readonly` **visualViewport**: `null` \| `VisualViewport`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/visualViewport)

#### Inherited from

`Window.visualViewport`

***

### window

> `readonly` **window**: `Window` & *typeof* `globalThis`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/window)

#### Inherited from

`Window.window`

## Accessors

### location

> `get` **location**(): `Location`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/location)

> `set` **location**(`href`): `void`

#### Parameters

• **href**: `string` \| `Location`

#### Returns

`Location`

## Methods

### addEventListener()

#### addEventListener(type, listener, options)

> **addEventListener**\<`K`\>(`type`, `listener`, `options`?): `void`

##### Type parameters

• **K** *extends* keyof `WindowEventMap`

##### Parameters

• **type**: `K`

• **listener**

• **options?**: `boolean` \| `AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`Window.addEventListener`

#### addEventListener(type, listener, options)

> **addEventListener**(`type`, `listener`, `options`?): `void`

##### Parameters

• **type**: `string`

• **listener**: `EventListenerOrEventListenerObject`

• **options?**: `boolean` \| `AddEventListenerOptions`

##### Returns

`void`

##### Inherited from

`Window.addEventListener`

***

### alert()

> **alert**(`message`?): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/alert)

#### Parameters

• **message?**: `any`

#### Returns

`void`

#### Inherited from

`Window.alert`

***

### atob()

> **atob**(`data`): `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/atob)

#### Parameters

• **data**: `string`

#### Returns

`string`

#### Inherited from

`Window.atob`

***

### blur()

> **blur**(): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/blur)

#### Returns

`void`

#### Inherited from

`Window.blur`

***

### btoa()

> **btoa**(`data`): `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/btoa)

#### Parameters

• **data**: `string`

#### Returns

`string`

#### Inherited from

`Window.btoa`

***

### cancelAnimationFrame()

> **cancelAnimationFrame**(`handle`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DedicatedWorkerGlobalScope/cancelAnimationFrame)

#### Parameters

• **handle**: `number`

#### Returns

`void`

#### Inherited from

`Window.cancelAnimationFrame`

***

### cancelIdleCallback()

> **cancelIdleCallback**(`handle`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/cancelIdleCallback)

#### Parameters

• **handle**: `number`

#### Returns

`void`

#### Inherited from

`Window.cancelIdleCallback`

***

### ~~captureEvents()~~

> **captureEvents**(): `void`

#### Returns

`void`

#### Inherited from

`Window.captureEvents`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/captureEvents)

***

### clearInterval()

> **clearInterval**(`id`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/clearInterval)

#### Parameters

• **id**: `undefined` \| `number`

#### Returns

`void`

#### Inherited from

`Window.clearInterval`

***

### clearTimeout()

> **clearTimeout**(`id`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/clearTimeout)

#### Parameters

• **id**: `undefined` \| `number`

#### Returns

`void`

#### Inherited from

`Window.clearTimeout`

***

### close()

> **close**(): `void`

Closes the window.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/close)

#### Returns

`void`

#### Inherited from

`Window.close`

***

### confirm()

> **confirm**(`message`?): `boolean`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/confirm)

#### Parameters

• **message?**: `string`

#### Returns

`boolean`

#### Inherited from

`Window.confirm`

***

### createImageBitmap()

#### createImageBitmap(image, options)

> **createImageBitmap**(`image`, `options`?): `Promise`\<`ImageBitmap`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/createImageBitmap)

##### Parameters

• **image**: `ImageBitmapSource`

• **options?**: `ImageBitmapOptions`

##### Returns

`Promise`\<`ImageBitmap`\>

##### Inherited from

`Window.createImageBitmap`

#### createImageBitmap(image, sx, sy, sw, sh, options)

> **createImageBitmap**(`image`, `sx`, `sy`, `sw`, `sh`, `options`?): `Promise`\<`ImageBitmap`\>

##### Parameters

• **image**: `ImageBitmapSource`

• **sx**: `number`

• **sy**: `number`

• **sw**: `number`

• **sh**: `number`

• **options?**: `ImageBitmapOptions`

##### Returns

`Promise`\<`ImageBitmap`\>

##### Inherited from

`Window.createImageBitmap`

***

### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

• **event**: `Event`

#### Returns

`boolean`

#### Inherited from

`Window.dispatchEvent`

***

### eventListeners()?

> `optional` **eventListeners**(`eventName`?): `EventListenerOrEventListenerObject`[]

Retrieve all event listeners by name.

This method is optional because it may not be available if you use `noop zone` when
bootstrapping Angular application or disable the `EventTarget` monkey patch by `zone.js`.

If the `eventName` is provided, will return an array of event handlers or event listener
objects of the given event.
If the `eventName` is not provided, will return all listeners.

#### Parameters

• **eventName?**: `string`

the name of the event, such as click. This parameter is optional.

#### Returns

`EventListenerOrEventListenerObject`[]

#### Inherited from

`Window.eventListeners`

***

### fetch()

> **fetch**(`input`, `init`?): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

#### Parameters

• **input**: `RequestInfo` \| `URL`

• **init?**: `RequestInit`

#### Returns

`Promise`\<`Response`\>

#### Inherited from

`Window.fetch`

***

### focus()

> **focus**(): `void`

Moves the focus to the window's browsing context, if any.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/focus)

#### Returns

`void`

#### Inherited from

`Window.focus`

***

### getComputedStyle()

> **getComputedStyle**(`elt`, `pseudoElt`?): `CSSStyleDeclaration`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/getComputedStyle)

#### Parameters

• **elt**: `Element`

• **pseudoElt?**: `null` \| `string`

#### Returns

`CSSStyleDeclaration`

#### Inherited from

`Window.getComputedStyle`

***

### getSelection()

> **getSelection**(): `null` \| `Selection`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/getSelection)

#### Returns

`null` \| `Selection`

#### Inherited from

`Window.getSelection`

***

### matchMedia()

> **matchMedia**(`query`): `MediaQueryList`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/matchMedia)

#### Parameters

• **query**: `string`

#### Returns

`MediaQueryList`

#### Inherited from

`Window.matchMedia`

***

### moveBy()

> **moveBy**(`x`, `y`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/moveBy)

#### Parameters

• **x**: `number`

• **y**: `number`

#### Returns

`void`

#### Inherited from

`Window.moveBy`

***

### moveTo()

> **moveTo**(`x`, `y`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/moveTo)

#### Parameters

• **x**: `number`

• **y**: `number`

#### Returns

`void`

#### Inherited from

`Window.moveTo`

***

### open()

> **open**(`url`?, `target`?, `features`?): `null` \| `Window`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/open)

#### Parameters

• **url?**: `string` \| `URL`

• **target?**: `string`

• **features?**: `string`

#### Returns

`null` \| `Window`

#### Inherited from

`Window.open`

***

### postMessage()

#### postMessage(message, targetOrigin, transfer)

> **postMessage**(`message`, `targetOrigin`, `transfer`?): `void`

Posts a message to the given window. Messages can be structured objects, e.g. nested objects and arrays, can contain JavaScript values (strings, numbers, Date objects, etc), and can contain certain data objects such as File Blob, FileList, and ArrayBuffer objects.

Objects listed in the transfer member of options are transferred, not just cloned, meaning that they are no longer usable on the sending side.

A target origin can be specified using the targetOrigin member of options. If not provided, it defaults to "/". This default restricts the message to same-origin targets only.

If the origin of the target window doesn't match the given target origin, the message is discarded, to avoid information leakage. To send the message to the target regardless of origin, set the target origin to "*".

Throws a "DataCloneError" DOMException if transfer array contains duplicate objects or if message could not be cloned.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/postMessage)

##### Parameters

• **message**: `any`

• **targetOrigin**: `string`

• **transfer?**: `Transferable`[]

##### Returns

`void`

##### Inherited from

`Window.postMessage`

#### postMessage(message, options)

> **postMessage**(`message`, `options`?): `void`

##### Parameters

• **message**: `any`

• **options?**: `WindowPostMessageOptions`

##### Returns

`void`

##### Inherited from

`Window.postMessage`

***

### print()

> **print**(): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/print)

#### Returns

`void`

#### Inherited from

`Window.print`

***

### prompt()

> **prompt**(`message`?, `_default`?): `null` \| `string`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/prompt)

#### Parameters

• **message?**: `string`

• **\_default?**: `string`

#### Returns

`null` \| `string`

#### Inherited from

`Window.prompt`

***

### queueMicrotask()

> **queueMicrotask**(`callback`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/queueMicrotask)

#### Parameters

• **callback**: `VoidFunction`

#### Returns

`void`

#### Inherited from

`Window.queueMicrotask`

***

### ~~releaseEvents()~~

> **releaseEvents**(): `void`

#### Returns

`void`

#### Inherited from

`Window.releaseEvents`

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/releaseEvents)

***

### removeAllListeners()?

> `optional` **removeAllListeners**(`eventName`?): `void`

Remove all event listeners by name for this event target.

This method is optional because it may not be available if you use `noop zone` when
bootstrapping Angular application or disable the `EventTarget` monkey patch by `zone.js`.

If the `eventName` is provided, will remove event listeners of that name.
If the `eventName` is not provided, will remove all event listeners associated with
`EventTarget`.

#### Parameters

• **eventName?**: `string`

the name of the event, such as `click`. This parameter is optional.

#### Returns

`void`

#### Inherited from

`Window.removeAllListeners`

***

### removeEventListener()

#### removeEventListener(type, listener, options)

> **removeEventListener**\<`K`\>(`type`, `listener`, `options`?): `void`

##### Type parameters

• **K** *extends* keyof `WindowEventMap`

##### Parameters

• **type**: `K`

• **listener**

• **options?**: `boolean` \| `EventListenerOptions`

##### Returns

`void`

##### Inherited from

`Window.removeEventListener`

#### removeEventListener(type, listener, options)

> **removeEventListener**(`type`, `listener`, `options`?): `void`

##### Parameters

• **type**: `string`

• **listener**: `EventListenerOrEventListenerObject`

• **options?**: `boolean` \| `EventListenerOptions`

##### Returns

`void`

##### Inherited from

`Window.removeEventListener`

***

### reportError()

> **reportError**(`e`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/reportError)

#### Parameters

• **e**: `any`

#### Returns

`void`

#### Inherited from

`Window.reportError`

***

### requestAnimationFrame()

> **requestAnimationFrame**(`callback`): `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame)

#### Parameters

• **callback**: `FrameRequestCallback`

#### Returns

`number`

#### Inherited from

`Window.requestAnimationFrame`

***

### requestIdleCallback()

> **requestIdleCallback**(`callback`, `options`?): `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/requestIdleCallback)

#### Parameters

• **callback**: `IdleRequestCallback`

• **options?**: `IdleRequestOptions`

#### Returns

`number`

#### Inherited from

`Window.requestIdleCallback`

***

### resizeBy()

> **resizeBy**(`x`, `y`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/resizeBy)

#### Parameters

• **x**: `number`

• **y**: `number`

#### Returns

`void`

#### Inherited from

`Window.resizeBy`

***

### resizeTo()

> **resizeTo**(`width`, `height`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/resizeTo)

#### Parameters

• **width**: `number`

• **height**: `number`

#### Returns

`void`

#### Inherited from

`Window.resizeTo`

***

### scroll()

#### scroll(options)

> **scroll**(`options`?): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scroll)

##### Parameters

• **options?**: `ScrollToOptions`

##### Returns

`void`

##### Inherited from

`Window.scroll`

#### scroll(x, y)

> **scroll**(`x`, `y`): `void`

##### Parameters

• **x**: `number`

• **y**: `number`

##### Returns

`void`

##### Inherited from

`Window.scroll`

***

### scrollBy()

#### scrollBy(options)

> **scrollBy**(`options`?): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollBy)

##### Parameters

• **options?**: `ScrollToOptions`

##### Returns

`void`

##### Inherited from

`Window.scrollBy`

#### scrollBy(x, y)

> **scrollBy**(`x`, `y`): `void`

##### Parameters

• **x**: `number`

• **y**: `number`

##### Returns

`void`

##### Inherited from

`Window.scrollBy`

***

### scrollTo()

#### scrollTo(options)

> **scrollTo**(`options`?): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/scrollTo)

##### Parameters

• **options?**: `ScrollToOptions`

##### Returns

`void`

##### Inherited from

`Window.scrollTo`

#### scrollTo(x, y)

> **scrollTo**(`x`, `y`): `void`

##### Parameters

• **x**: `number`

• **y**: `number`

##### Returns

`void`

##### Inherited from

`Window.scrollTo`

***

### setInterval()

> **setInterval**(`handler`, `timeout`?, ...`arguments`?): `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/setInterval)

#### Parameters

• **handler**: `TimerHandler`

• **timeout?**: `number`

• ...**arguments?**: `any`[]

#### Returns

`number`

#### Inherited from

`Window.setInterval`

***

### setTimeout()

> **setTimeout**(`handler`, `timeout`?, ...`arguments`?): `number`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/setTimeout)

#### Parameters

• **handler**: `TimerHandler`

• **timeout?**: `number`

• ...**arguments?**: `any`[]

#### Returns

`number`

#### Inherited from

`Window.setTimeout`

***

### stop()

> **stop**(): `void`

Cancels the document load.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/stop)

#### Returns

`void`

#### Inherited from

`Window.stop`

***

### structuredClone()

> **structuredClone**\<`T`\>(`value`, `options`?): `T`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/structuredClone)

#### Type parameters

• **T** = `any`

#### Parameters

• **value**: `T`

• **options?**: `StructuredSerializeOptions`

#### Returns

`T`

#### Inherited from

`Window.structuredClone`


<a name="projectsngx-piwik-prosrcpublic-apitype-aliasesdatalayermd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / DataLayer

# Type alias: DataLayer

> **DataLayer**: (`string` \| `object`)[]

Provides an interface os a _paq command list.


<a name="projectsngx-piwik-prosrcpublic-apitype-aliasespaqmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / Paq

# Type alias: Paq

> **Paq**: (`string` \| `object`)[]

Provides an interface os a _paq command list.


<a name="projectsngx-piwik-prosrcpublic-apivariablesngx_paqmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NGX\_PAQ

# Variable: NGX\_PAQ

> `const` **NGX\_PAQ**: `InjectionToken`\<`any`\>

Provides an injection token to access Piwik Pro Paq


<a name="projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_initializer_providermd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NGX\_PIWIK\_PRO\_INITIALIZER\_PROVIDER

# Variable: NGX\_PIWIK\_PRO\_INITIALIZER\_PROVIDER

> `const` **NGX\_PIWIK\_PRO\_INITIALIZER\_PROVIDER**: `FactoryProvider`


<a name="projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_router_initializer_providermd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NGX\_PIWIK\_PRO\_ROUTER\_INITIALIZER\_PROVIDER

# Variable: NGX\_PIWIK\_PRO\_ROUTER\_INITIALIZER\_PROVIDER

> `const` **NGX\_PIWIK\_PRO\_ROUTER\_INITIALIZER\_PROVIDER**: `Provider`


<a name="projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_routing_settings_tokenmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NGX\_PIWIK\_PRO\_ROUTING\_SETTINGS\_TOKEN

# Variable: NGX\_PIWIK\_PRO\_ROUTING\_SETTINGS\_TOKEN

> `const` **NGX\_PIWIK\_PRO\_ROUTING\_SETTINGS\_TOKEN**: `InjectionToken`\<[`PiwikProRoutingSettings`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikproroutingsettingsmd)\>


<a name="projectsngx-piwik-prosrcpublic-apivariablesngx_piwik_pro_settings_tokenmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NGX\_PIWIK\_PRO\_SETTINGS\_TOKEN

# Variable: NGX\_PIWIK\_PRO\_SETTINGS\_TOKEN

> `const` **NGX\_PIWIK\_PRO\_SETTINGS\_TOKEN**: `InjectionToken`\<[`PiwikProSettings`](#projectsngx-piwik-prosrcpublic-apiinterfacespiwikprosettingsmd)\>

Provide a Injection Token to global settings.


<a name="projectsngx-piwik-prosrcpublic-apivariablesngx_windowmd"></a>

[**@piwikpro/ngx-piwik-pro-project**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro-project](#modulesmd) / [projects/ngx-piwik-pro/src/public-api](#projectsngx-piwik-prosrcpublic-apireadmemd) / NGX\_WINDOW

# Variable: NGX\_WINDOW

> `const` **NGX\_WINDOW**: `InjectionToken`\<`Window`\>
