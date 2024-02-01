import { APP_INITIALIZER, FactoryProvider, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PiwikProSettings } from '../interfaces/piwik-pro-settings.interface';
import { NGX_PIWIK_PRO_SETTINGS_TOKEN } from '../tokens/ngx-piwik-pro-settings.token';

export const NGX_PIWIK_PRO_INITIALIZER_PROVIDER: FactoryProvider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: PiwikProInitializer,
  deps: [
    NGX_PIWIK_PRO_SETTINGS_TOKEN,
    DOCUMENT,
  ]
}

export function PiwikProInitializer(
  settings: PiwikProSettings,
  document: Document
) {
  if (window) {
    window._paq = window._paq || [];
  }
  return async () => {
    if (!settings.containerId) {
      if (!isDevMode()) {
        console.error('Empty tracking code for Piwik Pro. Make sure to provide one when initializing NgxPiwikProModule.');
      }

      return;
    }

    if (!settings.containerURL) {
      if (!isDevMode()) {
        console.error('Empty tracking URL for Piwik Pro. Make sure to provide one when initializing NgxPiwikProModule.');
      }

      return;
    }

    if (!document) {
      if (!isDevMode()) {
        console.error('Was not possible to access Document interface. Make sure this module is running on a Browser w/ access do Document interface.');
      }
    }

    const s: HTMLScriptElement = document.createElement('script');
    s.async = true;
    if (settings.nonce) {
      s.setAttribute("nonce", settings.nonce);
    }
    s.text = `(function(window, document, dataLayerName, id) {
window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
tags.async=!0,tags.src="${settings.containerURL}/containers/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
!function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
})(window, document, 'dataLayer', '${settings.containerId}')`;

    const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
    head.appendChild(s);
  }
}
