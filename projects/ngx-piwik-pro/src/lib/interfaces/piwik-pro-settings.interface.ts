import { InitOptions } from '@piwikpro/tracking-base-library';

export type PiwikProSettings = {
  containerId: string;
  containerURL: string;
} & InitOptions;
