export type LimitedArrayFiveStrings<T extends string[] = []> = [string, ...T] | [string, string, string, string, string];
