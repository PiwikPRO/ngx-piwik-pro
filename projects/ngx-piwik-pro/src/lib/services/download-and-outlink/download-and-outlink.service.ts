import { Dimensions, DownloadAndOutlink } from '@piwikpro/tracking-base-library'

import { Injectable } from '@angular/core';

type IDownloadAndOutlink = typeof DownloadAndOutlink;

@Injectable({
  providedIn: 'root'
})
export class DownloadAndOutlinkService {
  trackLink(...params: Parameters<IDownloadAndOutlink['trackLink']>) {
    DownloadAndOutlink.trackLink(...params);
  }
  enableLinkTracking(...params: Parameters<IDownloadAndOutlink['enableLinkTracking']>) {
    DownloadAndOutlink.enableLinkTracking(...params);
  }
  setLinkClasses(...params: Parameters<IDownloadAndOutlink['setLinkClasses']>) {
    DownloadAndOutlink.setLinkClasses(...params);
  }
  setDownloadClasses(...params: Parameters<IDownloadAndOutlink['setDownloadClasses']>) {
    DownloadAndOutlink.setDownloadClasses(...params);
  }
  setDownloadExtensions(...params: Parameters<IDownloadAndOutlink['setDownloadExtensions']>) {
    DownloadAndOutlink.setDownloadExtensions(...params);
  }
  addDownloadExtensions(...params: Parameters<IDownloadAndOutlink['addDownloadExtensions']>) {
    DownloadAndOutlink.addDownloadExtensions(...params);
  }
  removeDownloadExtensions(...params: Parameters<IDownloadAndOutlink['removeDownloadExtensions']>) {
    DownloadAndOutlink.removeDownloadExtensions(...params);
  }
  setLinkTrackingTimer(...params: Parameters<IDownloadAndOutlink['setLinkTrackingTimer']>) {
    DownloadAndOutlink.setLinkTrackingTimer(...params);
  }
  getLinkTrackingTimer(...params: Parameters<IDownloadAndOutlink['getLinkTrackingTimer']>) {
    return DownloadAndOutlink.getLinkTrackingTimer(...params);
  }
  setIgnoreClasses(...params: Parameters<IDownloadAndOutlink['setIgnoreClasses']>) {
    DownloadAndOutlink.setIgnoreClasses(...params);
  }
}
