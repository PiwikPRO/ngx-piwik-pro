import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class DownloadAndOutlinkService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  trackLink(url: string, linkType: string, customData?: object, callback?: (params: any) => void) {
    this.paqService.push([
      TRACK_EVENT.LINK,
      url,
      linkType,
      customData,
      callback
    ]);
  }

  enableLinkTracking(enable: boolean) {
    this.paqService.push([TRACK_EVENT.ENABLE_LINK_TRACKING, enable]);
  }

  setLinkClasses(classes: string[]) {
    this.paqService.push([TRACK_EVENT.SET_LINK_CLASSES, classes]);
  }

  setDownloadClasses(classes: string[]) {
    this.paqService.push([TRACK_EVENT.SET_DOWNLOAD_CLASSES, classes]);
  }

  setDownloadExtensions(extensions: string[]) {
    this.paqService.push([TRACK_EVENT.SET_DOWNLOAD_EXTENSIONS, extensions]);
  }

  addDownloadExtensions(extensions: string[]) {
    this.paqService.push([TRACK_EVENT.ADD_DOWNLOAD_EXTENSIONS, extensions]);
  }

  removeDownloadExtensions(extensions: string[]) {
    this.paqService.push([TRACK_EVENT.REMOVE_DOWNLOAD_EXTENSIONS, extensions]);
  }

  setLinkTrackingTimer(time: number) {
    this.paqService.push([TRACK_EVENT.SET_LINK_TRACKING_TIMER, time]);
  }

  getLinkTrackingTimer(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.paqService.push([
          function (this: any) {
            resolve(this.getLinkTrackingTimer());
          },
        ]);
      } catch (e) {
        if(e instanceof ReferenceError) {
          reject(e);
        }
      }
    });
  }

  setIgnoreClasses(classes: string[]) {
    this.paqService.push([TRACK_EVENT.SET_IGNORE_CLASSES, classes]);
  }
}
