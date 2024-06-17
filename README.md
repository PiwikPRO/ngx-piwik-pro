
<a name="readmemd"></a>

**@piwikpro/tracking-base-library** • [**Docs**](#globalsmd)

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


<a name="globalsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

# @piwikpro/tracking-base-library

## Namespaces

- [ContentTracking](#namespacescontenttrackingreadmemd)
- [CookieManagement](#namespacescookiemanagementreadmemd)
- [CustomDimensions](#namespacescustomdimensionsreadmemd)
- [CustomEvent](#namespacescustomeventreadmemd)
- [DataLayer](#namespacesdatalayerreadmemd)
- [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd)
- [ErrorTracking](#namespaceserrortrackingreadmemd)
- [GoalConversions](#namespacesgoalconversionsreadmemd)
- [PageViews](#namespacespageviewsreadmemd)
- [SiteSearch](#namespacessitesearchreadmemd)
- [UserManagement](#namespacesusermanagementreadmemd)
- [eCommerce](#namespacesecommercereadmemd)

## Type Aliases

- [Dimensions](#type-aliasesdimensionsmd)
- [InitOptions](#type-aliasesinitoptionsmd)
- [PaymentInformation](#type-aliasespaymentinformationmd)
- [Product](#type-aliasesproductmd)
- [VisitorInfo](#type-aliasesvisitorinfomd)

## Variables

- [default](#variablesdefaultmd)


<a name="namespacescontenttrackingreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / ContentTracking

# ContentTracking

## Index


- [logAllContentBlocksOnPage](#namespacescontenttrackingfunctionslogallcontentblocksonpagemd)
- [trackAllContentImpressions](#namespacescontenttrackingfunctionstrackallcontentimpressionsmd)
- [trackContentImpression](#namespacescontenttrackingfunctionstrackcontentimpressionmd)
- [trackContentImpressionsWithinNode](#namespacescontenttrackingfunctionstrackcontentimpressionswithinnodemd)
- [trackContentInteraction](#namespacescontenttrackingfunctionstrackcontentinteractionmd)
- [trackContentInteractionNode](#namespacescontenttrackingfunctionstrackcontentinteractionnodemd)
- [trackVisibleContentImpressions](#namespacescontenttrackingfunctionstrackvisiblecontentimpressionsmd)


<a name="namespacescontenttrackingfunctionslogallcontentblocksonpagemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / logAllContentBlocksOnPage

# Function: logAllContentBlocksOnPage()

> **logAllContentBlocksOnPage**(): `void`

Print all content blocks to the console for debugging purposes

## Returns

`void`


<a name="namespacescontenttrackingfunctionstrackallcontentimpressionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / trackAllContentImpressions

# Function: trackAllContentImpressions()

> **trackAllContentImpressions**(): `void`

Scans the entire DOM for content blocks and tracks impressions after all page
elements load. It does not send duplicates on repeated calls unless
trackPageView was called in between trackAllContentImpressions invocations

## Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentimpressionmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / trackContentImpression

# Function: trackContentImpression()

> **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

## Parameters

• **contentName**: `string`

• **contentPiece**: `string`

• **contentTarget**: `string`

## Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentimpressionswithinnodemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / trackContentImpressionsWithinNode

# Function: trackContentImpressionsWithinNode()

> **trackContentImpressionsWithinNode**(`domNode`): `void`

## Parameters

• **domNode**: `Node`

## Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentinteractionmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / trackContentInteraction

# Function: trackContentInteraction()

> **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

Tracks manual content interaction event

## Parameters

• **contentInteraction**: `string`

Type of interaction (e.g. "click")

• **contentName**: `string`

Name of a content block

• **contentPiece**: `string`

Name of the content that was displayed (e.g. link to an image)

• **contentTarget**: `string`

Where the content leads to (e.g. URL of some external website)

## Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentinteractionnodemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / trackContentInteractionNode

# Function: trackContentInteractionNode()

> **trackContentInteractionNode**(`domNode`, `contentInteraction`?): `void`

Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute

## Parameters

• **domNode**: `Node`

Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked.

• **contentInteraction?**: `string`

Name of interaction (e.g. "click")

## Returns

`void`


<a name="namespacescontenttrackingfunctionstrackvisiblecontentimpressionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ContentTracking](#namespacescontenttrackingreadmemd) / trackVisibleContentImpressions

# Function: trackVisibleContentImpressions()

> **trackVisibleContentImpressions**(`checkOnScroll`?, `watchInterval`?): `void`

Scans DOM for all visible content blocks and tracks impressions

## Parameters

• **checkOnScroll?**: `boolean`

Whether to scan for visible content on scroll event

• **watchInterval?**: `number`

Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0

## Returns

`void`


<a name="namespacescookiemanagementreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / CookieManagement

# CookieManagement

## Index


- [deleteCookies](#namespacescookiemanagementfunctionsdeletecookiesmd)
- [disableCookies](#namespacescookiemanagementfunctionsdisablecookiesmd)
- [enableCookies](#namespacescookiemanagementfunctionsenablecookiesmd)
- [getConfigVisitorCookieTimeout](#namespacescookiemanagementfunctionsgetconfigvisitorcookietimeoutmd)
- [getCookieDomain](#namespacescookiemanagementfunctionsgetcookiedomainmd)
- [getCookiePath](#namespacescookiemanagementfunctionsgetcookiepathmd)
- [getSessionCookieTimeout](#namespacescookiemanagementfunctionsgetsessioncookietimeoutmd)
- [hasCookies](#namespacescookiemanagementfunctionshascookiesmd)
- [setCookieDomain](#namespacescookiemanagementfunctionssetcookiedomainmd)
- [setCookieNamePrefix](#namespacescookiemanagementfunctionssetcookienameprefixmd)
- [setCookiePath](#namespacescookiemanagementfunctionssetcookiepathmd)
- [setReferralCookieTimeout](#namespacescookiemanagementfunctionssetreferralcookietimeoutmd)
- [setSecureCookie](#namespacescookiemanagementfunctionssetsecurecookiemd)
- [setSessionCookieTimeout](#namespacescookiemanagementfunctionssetsessioncookietimeoutmd)
- [setVisitorCookieTimeout](#namespacescookiemanagementfunctionssetvisitorcookietimeoutmd)
- [setVisitorIdCookie](#namespacescookiemanagementfunctionssetvisitoridcookiemd)


<a name="namespacescookiemanagementfunctionsdeletecookiesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / deleteCookies

# Function: deleteCookies()

> **deleteCookies**(): `void`

Deletes existing tracking cookies on the next page view

## Returns

`void`


<a name="namespacescookiemanagementfunctionsdisablecookiesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / disableCookies

# Function: disableCookies()

> **disableCookies**(): `void`

Disables all first party cookies. Existing cookies will be deleted in the next page view

## Returns

`void`


<a name="namespacescookiemanagementfunctionsenablecookiesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / enableCookies

# Function: enableCookies()

> **enableCookies**(): `void`

Enables all first party cookies. Cookies will be created on the next tracking request

## Returns

`void`


<a name="namespacescookiemanagementfunctionsgetconfigvisitorcookietimeoutmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / getConfigVisitorCookieTimeout

# Function: getConfigVisitorCookieTimeout()

> **getConfigVisitorCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of visitor cookies (in milliseconds)

## Returns

`Promise`\<`number`\>


<a name="namespacescookiemanagementfunctionsgetcookiedomainmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / getCookieDomain

# Function: getCookieDomain()

> **getCookieDomain**(): `Promise`\<`string`\>

Returns domain of the analytics tracking cookies (set with setCookieDomain()).

## Returns

`Promise`\<`string`\>


<a name="namespacescookiemanagementfunctionsgetcookiepathmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / getCookiePath

# Function: getCookiePath()

> **getCookiePath**(): `Promise`\<`string`\>

Returns the analytics tracking cookies path

## Returns

`Promise`\<`string`\>


<a name="namespacescookiemanagementfunctionsgetsessioncookietimeoutmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / getSessionCookieTimeout

# Function: getSessionCookieTimeout()

> **getSessionCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of session cookies

## Returns

`Promise`\<`number`\>


<a name="namespacescookiemanagementfunctionshascookiesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / hasCookies

# Function: hasCookies()

> **hasCookies**(): `Promise`\<`boolean`\>

Returns true if cookies are enabled in this browser

## Returns

`Promise`\<`boolean`\>


<a name="namespacescookiemanagementfunctionssetcookiedomainmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setCookieDomain

# Function: setCookieDomain()

> **setCookieDomain**(`domain`): `void`

Sets the domain for the analytics tracking cookies

## Parameters

• **domain**: `string`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetcookienameprefixmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setCookieNamePrefix

# Function: setCookieNamePrefix()

> **setCookieNamePrefix**(`prefix`): `void`

Sets the prefix for analytics tracking cookies. Default is "_pk_".

## Parameters

• **prefix**: `string`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetcookiepathmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setCookiePath

# Function: setCookiePath()

> **setCookiePath**(`path`): `void`

Sets the analytics tracking cookies path

## Parameters

• **path**: `string`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetreferralcookietimeoutmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setReferralCookieTimeout

# Function: setReferralCookieTimeout()

> **setReferralCookieTimeout**(`seconds`): `void`

Sets the expiration time of referral cookies

## Parameters

• **seconds**: `number`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetsecurecookiemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setSecureCookie

# Function: setSecureCookie()

> **setSecureCookie**(`secure`): `void`

Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)

## Parameters

• **secure**: `boolean`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetsessioncookietimeoutmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setSessionCookieTimeout

# Function: setSessionCookieTimeout()

> **setSessionCookieTimeout**(`seconds`): `void`

Sets the expiration time of session cookies

## Parameters

• **seconds**: `number`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetvisitorcookietimeoutmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setVisitorCookieTimeout

# Function: setVisitorCookieTimeout()

> **setVisitorCookieTimeout**(`seconds`): `void`

Sets the expiration time of visitor cookies

## Parameters

• **seconds**: `number`

## Returns

`void`


<a name="namespacescookiemanagementfunctionssetvisitoridcookiemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CookieManagement](#namespacescookiemanagementreadmemd) / setVisitorIdCookie

# Function: setVisitorIdCookie()

> **setVisitorIdCookie**(): `void`

Sets cookie containing [analytics ID](https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id) in browser

## Returns

`void`


<a name="namespacescustomdimensionsreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / CustomDimensions

# CustomDimensions

## Index


- [deleteCustomDimension](#namespacescustomdimensionsfunctionsdeletecustomdimensionmd)
- [getCustomDimensionValue](#namespacescustomdimensionsfunctionsgetcustomdimensionvaluemd)
- [setCustomDimensionValue](#namespacescustomdimensionsfunctionssetcustomdimensionvaluemd)


<a name="namespacescustomdimensionsfunctionsdeletecustomdimensionmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CustomDimensions](#namespacescustomdimensionsreadmemd) / deleteCustomDimension

# Function: deleteCustomDimension()

> **deleteCustomDimension**(`customDimensionId`): `void`

Removes a custom dimension with the specified ID.

## Parameters

• **customDimensionId**: `string` \| `number`

## Returns

`void`


<a name="namespacescustomdimensionsfunctionsgetcustomdimensionvaluemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CustomDimensions](#namespacescustomdimensionsreadmemd) / getCustomDimensionValue

# Function: getCustomDimensionValue()

> **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`string` \| `undefined`\>

Returns the value of a custom dimension with the specified ID.

## Parameters

• **customDimensionId**: `string` \| `number`

## Returns

`Promise`\<`string` \| `undefined`\>


<a name="namespacescustomdimensionsfunctionssetcustomdimensionvaluemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CustomDimensions](#namespacescustomdimensionsreadmemd) / setCustomDimensionValue

# Function: setCustomDimensionValue()

> **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

Sets a custom dimension value to be used later.

## Parameters

• **customDimensionId**: `string` \| `number`

• **customDimensionValue**: `string`

## Returns

`void`


<a name="namespacescustomeventreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / CustomEvent

# CustomEvent

## Index


- [trackEvent](#namespacescustomeventfunctionstrackeventmd)


<a name="namespacescustomeventfunctionstrackeventmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [CustomEvent](#namespacescustomeventreadmemd) / trackEvent

# Function: trackEvent()

> **trackEvent**(`category`, `action`, `name`?, `value`?, `dimensions`?): `void`

Tracks a custom event, e.g. when a visitor interacts with the page

## Parameters

• **category**: `string`

• **action**: `string`

• **name?**: `string`

• **value?**: `number`

• **dimensions?**: [`Dimensions`](#type-aliasesdimensionsmd)

## Returns

`void`


<a name="namespacesdatalayerreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / DataLayer

# DataLayer

## Index

### Type Aliases

- [DataLayerEntry](#namespacesdatalayertype-aliasesdatalayerentrymd)


- [push](#namespacesdatalayerfunctionspushmd)
- [setDataLayerName](#namespacesdatalayerfunctionssetdatalayernamemd)


<a name="namespacesdatalayerfunctionspushmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DataLayer](#namespacesdatalayerreadmemd) / push

# Function: push()

> **push**(`data`): `number`

Adds entry to a data layer

## Parameters

• **data**: [`DataLayerEntry`](#namespacesdatalayertype-aliasesdatalayerentrymd)

## Returns

`number`


<a name="namespacesdatalayerfunctionssetdatalayernamemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DataLayer](#namespacesdatalayerreadmemd) / setDataLayerName

# Function: setDataLayerName()

> **setDataLayerName**(`name`): `void`

## Parameters

• **name**: `string`

## Returns

`void`


<a name="namespacesdatalayertype-aliasesdatalayerentrymd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DataLayer](#namespacesdatalayerreadmemd) / DataLayerEntry

# Type alias: DataLayerEntry

> **DataLayerEntry**: `Record`\<`string`, `AnyData`\>


<a name="namespacesdownloadandoutlinkreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / DownloadAndOutlink

# DownloadAndOutlink

## Index


- [addDownloadExtensions](#namespacesdownloadandoutlinkfunctionsadddownloadextensionsmd)
- [enableLinkTracking](#namespacesdownloadandoutlinkfunctionsenablelinktrackingmd)
- [getLinkTrackingTimer](#namespacesdownloadandoutlinkfunctionsgetlinktrackingtimermd)
- [removeDownloadExtensions](#namespacesdownloadandoutlinkfunctionsremovedownloadextensionsmd)
- [setDownloadClasses](#namespacesdownloadandoutlinkfunctionssetdownloadclassesmd)
- [setDownloadExtensions](#namespacesdownloadandoutlinkfunctionssetdownloadextensionsmd)
- [setIgnoreClasses](#namespacesdownloadandoutlinkfunctionssetignoreclassesmd)
- [setLinkClasses](#namespacesdownloadandoutlinkfunctionssetlinkclassesmd)
- [setLinkTrackingTimer](#namespacesdownloadandoutlinkfunctionssetlinktrackingtimermd)
- [trackLink](#namespacesdownloadandoutlinkfunctionstracklinkmd)


<a name="namespacesdownloadandoutlinkfunctionsadddownloadextensionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / addDownloadExtensions

# Function: addDownloadExtensions()

> **addDownloadExtensions**(`extensions`): `void`

Adds new extensions to the download extensions list

## Parameters

• **extensions**: `string`[]

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionsenablelinktrackingmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / enableLinkTracking

# Function: enableLinkTracking()

> **enableLinkTracking**(`trackAlsoMiddleAndRightClicks`?): `void`

Enables automatic link tracking. If called with `true`, left, right and
middle clicks on links will be treated as opening a link. Opening a links to
an external site (different domain) creates an outlink event. Opening a link
to a downloadable file creates a download event

## Parameters

• **trackAlsoMiddleAndRightClicks?**: `boolean`

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionsgetlinktrackingtimermd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / getLinkTrackingTimer

# Function: getLinkTrackingTimer()

> **getLinkTrackingTimer**(): `Promise`\<`number`\>

Returns lock/wait time after a request set by setLinkTrackingTimer

## Returns

`Promise`\<`number`\>


<a name="namespacesdownloadandoutlinkfunctionsremovedownloadextensionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / removeDownloadExtensions

# Function: removeDownloadExtensions()

> **removeDownloadExtensions**(`extensions`): `void`

Removes extensions from the download extensions list

## Parameters

• **extensions**: `string`[]

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetdownloadclassesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / setDownloadClasses

# Function: setDownloadClasses()

> **setDownloadClasses**(`classes`): `void`

Sets a list of class names that indicate whether a list is a download and not an outlink

## Parameters

• **classes**: `string`[]

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetdownloadextensionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / setDownloadExtensions

# Function: setDownloadExtensions()

> **setDownloadExtensions**(`extensions`): `void`

Overwrites the list of file extensions indicating that a link is a download

## Parameters

• **extensions**: `string`[]

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetignoreclassesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / setIgnoreClasses

# Function: setIgnoreClasses()

> **setIgnoreClasses**(`classes`): `void`

Set a list of class names that indicate a link should not be tracked

## Parameters

• **classes**: `string`[]

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetlinkclassesmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / setLinkClasses

# Function: setLinkClasses()

> **setLinkClasses**(`classes`): `void`

Sets a list of class names that indicate whether a link is an outlink and not download

## Parameters

• **classes**: `string`[]

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetlinktrackingtimermd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / setLinkTrackingTimer

# Function: setLinkTrackingTimer()

> **setLinkTrackingTimer**(`time`): `void`

When a visitor produces an events and closes the page immediately afterwards,
e.g. when opening a link, the request might get cancelled. To avoid loosing
the last event this way, JavaScript Tracking Client will lock the page for a
fraction of a second (if wait time hasn’t passed), giving the request time to
reach the Collecting & Processing Pipeline

## Parameters

• **time**: `number`

## Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionstracklinkmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd) / trackLink

# Function: trackLink()

> **trackLink**(`url`, `linkType`, `dimensions`?, `callback`?): `void`

Manually tracks outlink or download event with provided values

## Parameters

• **url**: `string`

• **linkType**: `string`

• **dimensions?**: [`Dimensions`](#type-aliasesdimensionsmd)

• **callback?**

## Returns

`void`


<a name="namespaceserrortrackingreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / ErrorTracking

# ErrorTracking

## Index


- [enableJSErrorTracking](#namespaceserrortrackingfunctionsenablejserrortrackingmd)
- [trackError](#namespaceserrortrackingfunctionstrackerrormd)


<a name="namespaceserrortrackingfunctionsenablejserrortrackingmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ErrorTracking](#namespaceserrortrackingreadmemd) / enableJSErrorTracking

# Function: enableJSErrorTracking()

> **enableJSErrorTracking**(`unique`?): `void`

Enables tracking of unhandled JavaScript errors.

## Parameters

• **unique?**: `boolean`

track only unique errors

## Returns

`void`


<a name="namespaceserrortrackingfunctionstrackerrormd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [ErrorTracking](#namespaceserrortrackingreadmemd) / trackError

# Function: trackError()

> **trackError**(`error`): `void`

Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
([enableJSErrorTracking](#namespaceserrortrackingfunctionsenablejserrortrackingmd) function was called before this attempt). It will also respect rules for tracking only unique errors.

## Parameters

• **error**: `Error`

## Returns

`void`


<a name="namespacesgoalconversionsreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / GoalConversions

# GoalConversions

## Index


- [trackGoal](#namespacesgoalconversionsfunctionstrackgoalmd)


<a name="namespacesgoalconversionsfunctionstrackgoalmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [GoalConversions](#namespacesgoalconversionsreadmemd) / trackGoal

# Function: trackGoal()

> **trackGoal**(`goalId`, `conversionValue`, `dimensions`?): `void`

Tracks manual goal conversion

## Parameters

• **goalId**: `string` \| `number`

• **conversionValue**: `number`

• **dimensions?**: [`Dimensions`](#type-aliasesdimensionsmd)

## Returns

`void`


<a name="namespacespageviewsreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / PageViews

# PageViews

## Index


- [trackPageView](#namespacespageviewsfunctionstrackpageviewmd)


<a name="namespacespageviewsfunctionstrackpageviewmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [PageViews](#namespacespageviewsreadmemd) / trackPageView

# Function: trackPageView()

> **trackPageView**(`customPageTitle`?): `void`

Tracks a visit on the page that the function was run on

## Parameters

• **customPageTitle?**: `string`

## Returns

`void`


<a name="namespacessitesearchreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / SiteSearch

# SiteSearch

## Index


- [trackSiteSearch](#namespacessitesearchfunctionstracksitesearchmd)


<a name="namespacessitesearchfunctionstracksitesearchmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [SiteSearch](#namespacessitesearchreadmemd) / trackSiteSearch

# Function: trackSiteSearch()

> **trackSiteSearch**(`keyword`, `category`?, `searchCount`?, `dimensions`?): `void`

Tracks search requests on a website

## Parameters

• **keyword**: `string`

• **category?**: `string`

• **searchCount?**: `number`

• **dimensions?**: [`Dimensions`](#type-aliasesdimensionsmd)

## Returns

`void`


<a name="namespacesusermanagementreadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / UserManagement

# UserManagement

## Index


- [getUserId](#namespacesusermanagementfunctionsgetuseridmd)
- [getVisitorId](#namespacesusermanagementfunctionsgetvisitoridmd)
- [getVisitorInfo](#namespacesusermanagementfunctionsgetvisitorinfomd)
- [resetUserId](#namespacesusermanagementfunctionsresetuseridmd)
- [setUserId](#namespacesusermanagementfunctionssetuseridmd)


<a name="namespacesusermanagementfunctionsgetuseridmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [UserManagement](#namespacesusermanagementreadmemd) / getUserId

# Function: getUserId()

> **getUserId**(): `Promise`\<`string`\>

The function that will return user ID

## Returns

`Promise`\<`string`\>


<a name="namespacesusermanagementfunctionsgetvisitoridmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [UserManagement](#namespacesusermanagementreadmemd) / getVisitorId

# Function: getVisitorId()

> **getVisitorId**(): `Promise`\<`string`\>

Returns 16-character hex ID of the visitor

## Returns

`Promise`\<`string`\>


<a name="namespacesusermanagementfunctionsgetvisitorinfomd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [UserManagement](#namespacesusermanagementreadmemd) / getVisitorInfo

# Function: getVisitorInfo()

> **getVisitorInfo**(): `Promise`\<[`VisitorInfo`](#type-aliasesvisitorinfomd)\>

Returns visitor information in an array

## Returns

`Promise`\<[`VisitorInfo`](#type-aliasesvisitorinfomd)\>


<a name="namespacesusermanagementfunctionsresetuseridmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [UserManagement](#namespacesusermanagementreadmemd) / resetUserId

# Function: resetUserId()

> **resetUserId**(): `void`

Clears previously set userID, e.g. when visitor logs out

## Returns

`void`


<a name="namespacesusermanagementfunctionssetuseridmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [UserManagement](#namespacesusermanagementreadmemd) / setUserId

# Function: setUserId()

> **setUserId**(`userId`): `void`

User ID is an additional parameter that allows you to aggregate data. When
set up, you will be able to search through sessions by this parameter, filter
reports through it or create Multi attribution reports using User ID

## Parameters

• **userId**: `string`

## Returns

`void`


<a name="namespacesecommercereadmemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / eCommerce

# eCommerce

## Index


- [addEcommerceItem](#namespacesecommercefunctionsaddecommerceitemmd)
- [clearEcommerceCart](#namespacesecommercefunctionsclearecommercecartmd)
- [ecommerceAddToCart](#namespacesecommercefunctionsecommerceaddtocartmd)
- [ecommerceCartUpdate](#namespacesecommercefunctionsecommercecartupdatemd)
- [ecommerceOrder](#namespacesecommercefunctionsecommerceordermd)
- [ecommerceProductDetailView](#namespacesecommercefunctionsecommerceproductdetailviewmd)
- [ecommerceRemoveFromCart](#namespacesecommercefunctionsecommerceremovefromcartmd)
- [getEcommerceItems](#namespacesecommercefunctionsgetecommerceitemsmd)
- [removeEcommerceItem](#namespacesecommercefunctionsremoveecommerceitemmd)
- [setEcommerceView](#namespacesecommercefunctionssetecommerceviewmd)
- [trackEcommerceCartUpdate](#namespacesecommercefunctionstrackecommercecartupdatemd)
- [trackEcommerceOrder](#namespacesecommercefunctionstrackecommerceordermd)


<a name="namespacesecommercefunctionsaddecommerceitemmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / addEcommerceItem

# Function: ~~addEcommerceItem()~~

> **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

## Parameters

• **productSKU**: `string`

• **productName**: `string`

• **productCategory**: `string` \| `string`[]

• **productPrice**: `number`

• **productQuantity**: `number`

## Returns

`void`

## Deprecated

Please use the ecommerceAddToCart instead.


<a name="namespacesecommercefunctionsclearecommercecartmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / clearEcommerceCart

# Function: ~~clearEcommerceCart()~~

> **clearEcommerceCart**(): `void`

## Returns

`void`

## Deprecated


<a name="namespacesecommercefunctionsecommerceaddtocartmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / ecommerceAddToCart

# Function: ecommerceAddToCart()

> **ecommerceAddToCart**(`products`): `void`

Tracks action of adding products to a cart

## Parameters

• **products**: [`Product`](#type-aliasesproductmd)[]

## Returns

`void`


<a name="namespacesecommercefunctionsecommercecartupdatemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / ecommerceCartUpdate

# Function: ecommerceCartUpdate()

> **ecommerceCartUpdate**(`products`, `grandTotal`): `void`

Tracks current state of a cart

## Parameters

• **products**: [`Product`](#type-aliasesproductmd)[]

• **grandTotal**: `string` \| `number`

## Returns

`void`


<a name="namespacesecommercefunctionsecommerceordermd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / ecommerceOrder

# Function: ecommerceOrder()

> **ecommerceOrder**(`products`, `paymentInformation`): `void`

Tracks conversion, including products and payment details

## Parameters

• **products**: [`Product`](#type-aliasesproductmd)[]

• **paymentInformation**: [`PaymentInformation`](#type-aliasespaymentinformationmd)

## Returns

`void`


<a name="namespacesecommercefunctionsecommerceproductdetailviewmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / ecommerceProductDetailView

# Function: ecommerceProductDetailView()

> **ecommerceProductDetailView**(`products`): `void`

Tracks action of viewing product page

## Parameters

• **products**: [`Product`](#type-aliasesproductmd)[]

## Returns

`void`


<a name="namespacesecommercefunctionsecommerceremovefromcartmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / ecommerceRemoveFromCart

# Function: ecommerceRemoveFromCart()

> **ecommerceRemoveFromCart**(`products`): `void`

Tracks action of removing a products from a cart

## Parameters

• **products**: [`Product`](#type-aliasesproductmd)[]

## Returns

`void`


<a name="namespacesecommercefunctionsgetecommerceitemsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / getEcommerceItems

# Function: ~~getEcommerceItems()~~

> **getEcommerceItems**(): `Promise`\<`object`\>

## Returns

`Promise`\<`object`\>

## Deprecated


<a name="namespacesecommercefunctionsremoveecommerceitemmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / removeEcommerceItem

# Function: ~~removeEcommerceItem()~~

> **removeEcommerceItem**(`productSKU`): `void`

## Parameters

• **productSKU**: `string`

## Returns

`void`

## Deprecated

Please use the ecommerceRemoveFromCart instead.


<a name="namespacesecommercefunctionssetecommerceviewmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / setEcommerceView

# Function: ~~setEcommerceView()~~

> **setEcommerceView**(`productSKU`, `productName`?, `productCategory`?, `productPrice`?): `void`

## Parameters

• **productSKU**: `string`

• **productName?**: `string`

• **productCategory?**: `string`[]

• **productPrice?**: `string`

## Returns

`void`

## Deprecated


<a name="namespacesecommercefunctionstrackecommercecartupdatemd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / trackEcommerceCartUpdate

# Function: ~~trackEcommerceCartUpdate()~~

> **trackEcommerceCartUpdate**(`cartAmount`): `void`

## Parameters

• **cartAmount**: `number`

## Returns

`void`

## Deprecated

Please use the ecommerceCartUpdate instead.


<a name="namespacesecommercefunctionstrackecommerceordermd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / [eCommerce](#namespacesecommercereadmemd) / trackEcommerceOrder

# Function: ~~trackEcommerceOrder()~~

> **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal`?, `orderTax`?, `orderShipping`?, `orderDiscount`?): `void`

## Parameters

• **orderId**: `string`

• **orderGrandTotal**: `number`

• **orderSubTotal?**: `number`

• **orderTax?**: `number`

• **orderShipping?**: `number`

• **orderDiscount?**: `number`

## Returns

`void`

## Deprecated

Please use the ecommerceOrder instead.


<a name="type-aliasesdimensionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / Dimensions

# Type alias: Dimensions

> **Dimensions**: `Record`\<\`dimension$\{number\}\`, `string`\>


<a name="type-aliasesinitoptionsmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / InitOptions

# Type alias: InitOptions

> **InitOptions**: `object`

## Type declaration

### dataLayerName?

> `optional` **dataLayerName**: `string`

Defaults to 'dataLayer'

### nonce?

> `optional` **nonce**: `string`


<a name="type-aliasespaymentinformationmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / PaymentInformation

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


<a name="type-aliasesproductmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / Product

# Type alias: Product

> **Product**: `object`

## Type declaration

### brand?

> `optional` **brand**: `string`

### category?

> `optional` **category**: `LimitedArrayFiveStrings`

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


<a name="type-aliasesvisitorinfomd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / VisitorInfo

# Type alias: VisitorInfo

> **VisitorInfo**: [`"0"` \| `"1"`, `string`, `number`, `string` \| `number`, `number`, `number` \| `""`, `number` \| `""`]


<a name="variablesdefaultmd"></a>

[**@piwikpro/tracking-base-library**](#readmemd) • **Docs**

***

[@piwikpro/tracking-base-library](#globalsmd) / default

# Variable: default

> `const` **default**: `object`

## Type declaration

### getInitScript

> **getInitScript**: *typeof* `PiwikPro.getInitScript`

### initialize

> **initialize**: *typeof* `PiwikPro.init`
