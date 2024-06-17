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
