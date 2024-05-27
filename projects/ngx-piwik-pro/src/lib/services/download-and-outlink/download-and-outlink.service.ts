import { Dimensions, DownloadAndOutlink } from '@piwikpro/tracking-base-library'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadAndOutlinkService {
  trackLink(url: string, linkType: string, customData?: Dimensions, callback?: () => void) {
    DownloadAndOutlink.trackLink(url, linkType, customData, callback);
  }

  enableLinkTracking(enable: boolean) {
    DownloadAndOutlink.enableLinkTracking(enable);
  }

  setLinkClasses(classes: string[]) {
    DownloadAndOutlink.setLinkClasses(classes);
  }

  setDownloadClasses(classes: string[]) {
    DownloadAndOutlink.setDownloadClasses(classes);
  }

  setDownloadExtensions(extensions: string[]) {
    DownloadAndOutlink.setDownloadExtensions(extensions);
  }

  addDownloadExtensions(extensions: string[]) {
    DownloadAndOutlink.addDownloadExtensions(extensions);
  }

  removeDownloadExtensions(extensions: string[]) {
    DownloadAndOutlink.removeDownloadExtensions(extensions)
  }

  setLinkTrackingTimer(time: number) {
    DownloadAndOutlink.setLinkTrackingTimer(time);
  }

  getLinkTrackingTimer(): Promise<number> {
    return DownloadAndOutlink.getLinkTrackingTimer();
  }

  setIgnoreClasses(classes: string[]) {
    DownloadAndOutlink.setIgnoreClasses(classes);
  }
}
