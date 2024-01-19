export interface PiwikProRoutingSettings {
  skipFirstPageView?: boolean;
  exclude?: Array<string | RegExp>;
  include?: Array<string | RegExp>;
}
