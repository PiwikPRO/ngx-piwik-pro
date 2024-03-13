import { LimitedArrayFiveStrings } from './piwik-pro-utils.interface';
type DimensionId = number;
export type Product = {
    sku: string;
    name?: string;
    category?: LimitedArrayFiveStrings;
    price?: number;
    quantity?: number;
    brand?: string;
    variant?: string;
    customDimensions?: Record<DimensionId, string>;
};

export type PaymentInformation = {
  orderId: string;
  grandTotal: number | string;
  subTotal?: number | string;
  tax?: number | string;
  shipping?: number | string;
  discount?: number | string;
};

