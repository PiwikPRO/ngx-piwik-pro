import { Heartbeat } from '@piwikpro/tracking-base-library';
import { Injectable } from '@angular/core';

type IHeartbeat = typeof Heartbeat;

@Injectable({
  providedIn: 'root',
})
export class HeartbeatService {
  enableHeartBeatTimer(
    ...params: Parameters<IHeartbeat['enableHeartBeatTimer']>
  ) {
    Heartbeat.enableHeartBeatTimer(...params);
  }

  disableHeartBeatTimer(
    ...params: Parameters<IHeartbeat['disableHeartBeatTimer']>
  ) {
    Heartbeat.disableHeartBeatTimer(...params);
  }
}
