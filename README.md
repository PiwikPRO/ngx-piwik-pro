
<a name="readmemd"></a>

**@piwikpro/ngx-piwik-pro** • [**Docs**](#modulesmd)

***

# Piwik PRO Library for Angular

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in Angular 8+ applications.

- [Installation](#installation)
  - [NPM](#npm)
  - [Basic setup](#basic-setup)
  - [Routing setup](#set-up-the-routing-module)
  - [Advanced routing setup](#advanced-setup-for-the-routing-module)
- [Piwik PRO Services](#piwik-pro-services)
  - [Custom Events](#send-custom-events)
  - [Page Views](#send-page-views-and-virtual-page-views)
- [API](#api)
  - [Page Views Service](#page-views-service)
  - [User Management](#user-management)
  - [Custom Event](#custom-event)
  - [Site search Service](#site-search-service)
  - [E-Commerce Service](#e-commerce-service)
  - [Content Tracking Service](#content-tracking-service)
  - [Download and outlink Service](#download-and-outlink-service)
  - [Goal Conversions](#goal-conversions)
  - [Custom Dimensions](#custom-dimensions)

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
import { NgxPiwikProModule } from "@piwikpro/ngx-piwik-pro";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxPiwikProModule.forRoot("container-id", "container-url"),
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization method.

```ts
import { NgxPiwikProModule } from "@piwikpro/ngx-piwik-pro";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxPiwikProModule.forRoot("container-id", "container-url", "nonce-hash"),
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Set up the Routing Module

We provide a second Module Dependency to configure Router Event Bindings and perform automatic page views every time your application navigates to another page.

Add `NgxPiwikProRouterModule` on AppModule to enable auto track `Router` events.

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

- Simple route matching: `{ include: [ '/full-uri-match' ] }`;
- Wildcard route matching: `{ include: [ '*/public/*' ] }`;
- Regular Expression route matching: `{ include: [ /^\/public\/.*/ ] }`;

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


<a name="content-trackingcontent-trackingservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / content-tracking/content-tracking.service

# content-tracking/content-tracking.service

## Index

### Classes

- [ContentTrackingService](#content-trackingcontent-trackingserviceclassescontenttrackingservicemd)


<a name="content-trackingcontent-trackingserviceclassescontenttrackingservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [content-tracking/content-tracking.service](#content-trackingcontent-trackingservicereadmemd) / ContentTrackingService

# Class: ContentTrackingService

## Constructors

### new ContentTrackingService()

> **new ContentTrackingService**(): [`ContentTrackingService`](#content-trackingcontent-trackingserviceclassescontenttrackingservicemd)

#### Returns

[`ContentTrackingService`](#content-trackingcontent-trackingserviceclassescontenttrackingservicemd)

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


<a name="cookie-managementcookie-managementservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / cookie-management/cookie-management.service

# cookie-management/cookie-management.service

## Index

### Classes

- [CookieManagementService](#cookie-managementcookie-managementserviceclassescookiemanagementservicemd)


<a name="cookie-managementcookie-managementserviceclassescookiemanagementservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [cookie-management/cookie-management.service](#cookie-managementcookie-managementservicereadmemd) / CookieManagementService

# Class: CookieManagementService

## Constructors

### new CookieManagementService()

> **new CookieManagementService**(): [`CookieManagementService`](#cookie-managementcookie-managementserviceclassescookiemanagementservicemd)

#### Returns

[`CookieManagementService`](#cookie-managementcookie-managementserviceclassescookiemanagementservicemd)

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


<a name="custom-dimensionscustom-dimensionsservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / custom-dimensions/custom-dimensions.service

# custom-dimensions/custom-dimensions.service

## Index

### Classes

- [CustomDimensionsService](#custom-dimensionscustom-dimensionsserviceclassescustomdimensionsservicemd)


<a name="custom-dimensionscustom-dimensionsserviceclassescustomdimensionsservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [custom-dimensions/custom-dimensions.service](#custom-dimensionscustom-dimensionsservicereadmemd) / CustomDimensionsService

# Class: CustomDimensionsService

## Constructors

### new CustomDimensionsService()

> **new CustomDimensionsService**(): [`CustomDimensionsService`](#custom-dimensionscustom-dimensionsserviceclassescustomdimensionsservicemd)

#### Returns

[`CustomDimensionsService`](#custom-dimensionscustom-dimensionsserviceclassescustomdimensionsservicemd)

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


<a name="custom-eventcustom-eventsservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / custom-event/custom-events.service

# custom-event/custom-events.service

## Index

### Classes

- [CustomEventsService](#custom-eventcustom-eventsserviceclassescustomeventsservicemd)


<a name="custom-eventcustom-eventsserviceclassescustomeventsservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [custom-event/custom-events.service](#custom-eventcustom-eventsservicereadmemd) / CustomEventsService

# Class: CustomEventsService

## Constructors

### new CustomEventsService()

> **new CustomEventsService**(): [`CustomEventsService`](#custom-eventcustom-eventsserviceclassescustomeventsservicemd)

#### Returns

[`CustomEventsService`](#custom-eventcustom-eventsserviceclassescustomeventsservicemd)

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


<a name="data-layerdata-layerservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / data-layer/data-layer.service

# data-layer/data-layer.service

## Index

### Classes

- [DataLayerService](#data-layerdata-layerserviceclassesdatalayerservicemd)


<a name="data-layerdata-layerserviceclassesdatalayerservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [data-layer/data-layer.service](#data-layerdata-layerservicereadmemd) / DataLayerService

# Class: DataLayerService

## Constructors

### new DataLayerService()

> **new DataLayerService**(): [`DataLayerService`](#data-layerdata-layerserviceclassesdatalayerservicemd)

#### Returns

[`DataLayerService`](#data-layerdata-layerserviceclassesdatalayerservicemd)

## Methods

### push()

> **push**(`data`): `number`

#### Parameters

• **data**: `any`

#### Returns

`number`


<a name="download-and-outlinkdownload-and-outlinkservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / download-and-outlink/download-and-outlink.service

# download-and-outlink/download-and-outlink.service

## Index

### Classes

- [DownloadAndOutlinkService](#download-and-outlinkdownload-and-outlinkserviceclassesdownloadandoutlinkservicemd)


<a name="download-and-outlinkdownload-and-outlinkserviceclassesdownloadandoutlinkservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [download-and-outlink/download-and-outlink.service](#download-and-outlinkdownload-and-outlinkservicereadmemd) / DownloadAndOutlinkService

# Class: DownloadAndOutlinkService

## Constructors

### new DownloadAndOutlinkService()

> **new DownloadAndOutlinkService**(): [`DownloadAndOutlinkService`](#download-and-outlinkdownload-and-outlinkserviceclassesdownloadandoutlinkservicemd)

#### Returns

[`DownloadAndOutlinkService`](#download-and-outlinkdownload-and-outlinkserviceclassesdownloadandoutlinkservicemd)

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

• **customData?**: `Dimensions`

• **callback?**

#### Returns

`void`


<a name="e-commercee-commerceservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / e-commerce/e-commerce.service

# e-commerce/e-commerce.service

## Index

### Classes

- [ECommerceService](#e-commercee-commerceserviceclassesecommerceservicemd)


<a name="e-commercee-commerceserviceclassesecommerceservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [e-commerce/e-commerce.service](#e-commercee-commerceservicereadmemd) / ECommerceService

# Class: ECommerceService

## Constructors

### new ECommerceService()

> **new ECommerceService**(`paqService`): [`ECommerceService`](#e-commercee-commerceserviceclassesecommerceservicemd)

#### Parameters

• **paqService**: [`PaqService`](#paqpaqserviceclassespaqservicemd)

#### Returns

[`ECommerceService`](#e-commercee-commerceserviceclassesecommerceservicemd)

## Properties

### paqService

> `private` `readonly` **paqService**: [`PaqService`](#paqpaqserviceclassespaqservicemd)

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

• **products**: `Product`[]

#### Returns

`void`

***

### ecommerceCartUpdate()

> **ecommerceCartUpdate**(`products`, `grandTotal`): `void`

#### Parameters

• **products**: `Product`[]

• **grandTotal**: `string` \| `number`

#### Returns

`void`

***

### ecommerceOrder()

> **ecommerceOrder**(`products`, `paymentInformation`): `void`

#### Parameters

• **products**: `Product`[]

• **paymentInformation**: `PaymentInformation`

#### Returns

`void`

***

### ecommerceProductDetailView()

> **ecommerceProductDetailView**(`products`): `void`

#### Parameters

• **products**: `Product`[]

#### Returns

`void`

***

### ecommerceRemoveFromCart()

> **ecommerceRemoveFromCart**(`products`): `void`

#### Parameters

• **products**: `Product`[]

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


<a name="goal-conversionsgoal-conversionsservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / goal-conversions/goal-conversions.service

# goal-conversions/goal-conversions.service

## Index

### Classes

- [GoalConversionsService](#goal-conversionsgoal-conversionsserviceclassesgoalconversionsservicemd)


<a name="goal-conversionsgoal-conversionsserviceclassesgoalconversionsservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [goal-conversions/goal-conversions.service](#goal-conversionsgoal-conversionsservicereadmemd) / GoalConversionsService

# Class: GoalConversionsService

## Constructors

### new GoalConversionsService()

> **new GoalConversionsService**(): [`GoalConversionsService`](#goal-conversionsgoal-conversionsserviceclassesgoalconversionsservicemd)

#### Returns

[`GoalConversionsService`](#goal-conversionsgoal-conversionsserviceclassesgoalconversionsservicemd)

## Methods

### trackGoal()

> **trackGoal**(`goalId`, `conversionValue`, `dimensions`?): `void`

#### Parameters

• **goalId**: `string` \| `number`

• **conversionValue**: `number`

• **dimensions?**: `Dimensions`

#### Returns

`void`


<a name="modulesmd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***


## Modules

- [content-tracking/content-tracking.service](#content-trackingcontent-trackingservicereadmemd)
- [cookie-management/cookie-management.service](#cookie-managementcookie-managementservicereadmemd)
- [custom-dimensions/custom-dimensions.service](#custom-dimensionscustom-dimensionsservicereadmemd)
- [custom-event/custom-events.service](#custom-eventcustom-eventsservicereadmemd)
- [data-layer/data-layer.service](#data-layerdata-layerservicereadmemd)
- [download-and-outlink/download-and-outlink.service](#download-and-outlinkdownload-and-outlinkservicereadmemd)
- [e-commerce/e-commerce.service](#e-commercee-commerceservicereadmemd)
- [goal-conversions/goal-conversions.service](#goal-conversionsgoal-conversionsservicereadmemd)
- [page-views/page-views.service](#page-viewspage-viewsservicereadmemd)
- [paq/paq.service](#paqpaqservicereadmemd)
- [site-search/site-search.service](#site-searchsite-searchservicereadmemd)
- [user-management/user-management.service](#user-managementuser-managementservicereadmemd)


<a name="page-viewspage-viewsservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / page-views/page-views.service

# page-views/page-views.service

## Index

### Classes

- [PageViewsService](#page-viewspage-viewsserviceclassespageviewsservicemd)


<a name="page-viewspage-viewsserviceclassespageviewsservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [page-views/page-views.service](#page-viewspage-viewsservicereadmemd) / PageViewsService

# Class: PageViewsService

## Constructors

### new PageViewsService()

> **new PageViewsService**(): [`PageViewsService`](#page-viewspage-viewsserviceclassespageviewsservicemd)

#### Returns

[`PageViewsService`](#page-viewspage-viewsserviceclassespageviewsservicemd)

## Methods

### trackPageView()

> **trackPageView**(`customPageTitle`?): `void`

#### Parameters

• **customPageTitle?**: `string`

#### Returns

`void`


<a name="paqpaqservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / paq/paq.service

# paq/paq.service

## Index

### Classes

- [PaqService](#paqpaqserviceclassespaqservicemd)


<a name="paqpaqserviceclassespaqservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [paq/paq.service](#paqpaqservicereadmemd) / PaqService

# Class: PaqService

## Constructors

### new PaqService()

> **new PaqService**(`titleService`, `routerService`, `_window`): [`PaqService`](#paqpaqserviceclassespaqservicemd)

#### Parameters

• **titleService**: `Title`

• **routerService**: `Router`

• **\_window**: `PiwikProWindow`

#### Returns

[`PaqService`](#paqpaqserviceclassespaqservicemd)

## Properties

### \_window

> `private` `readonly` **\_window**: `PiwikProWindow`

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


<a name="site-searchsite-searchservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / site-search/site-search.service

# site-search/site-search.service

## Index

### Classes

- [SiteSearchService](#site-searchsite-searchserviceclassessitesearchservicemd)


<a name="site-searchsite-searchserviceclassessitesearchservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [site-search/site-search.service](#site-searchsite-searchservicereadmemd) / SiteSearchService

# Class: SiteSearchService

## Constructors

### new SiteSearchService()

> **new SiteSearchService**(): [`SiteSearchService`](#site-searchsite-searchserviceclassessitesearchservicemd)

#### Returns

[`SiteSearchService`](#site-searchsite-searchserviceclassessitesearchservicemd)

## Methods

### trackSiteSearch()

> **trackSiteSearch**(`keyword`, `category`?, `searchCount`?, `dimensions`?): `void`

#### Parameters

• **keyword**: `string`

• **category?**: `string`

• **searchCount?**: `number`

• **dimensions?**: `Dimensions`

#### Returns

`void`


<a name="user-managementuser-managementservicereadmemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / user-management/user-management.service

# user-management/user-management.service

## Index

### Classes

- [UserManagementService](#user-managementuser-managementserviceclassesusermanagementservicemd)


<a name="user-managementuser-managementserviceclassesusermanagementservicemd"></a>

[**@piwikpro/ngx-piwik-pro**](#readmemd) • **Docs**

***

[@piwikpro/ngx-piwik-pro](#modulesmd) / [user-management/user-management.service](#user-managementuser-managementservicereadmemd) / UserManagementService

# Class: UserManagementService

## Constructors

### new UserManagementService()

> **new UserManagementService**(): [`UserManagementService`](#user-managementuser-managementserviceclassesusermanagementservicemd)

#### Returns

[`UserManagementService`](#user-managementuser-managementserviceclassesusermanagementservicemd)

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
