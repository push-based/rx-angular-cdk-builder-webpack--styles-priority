import { JsonObject } from '@angular-devkit/core';
import { Configuration } from 'webpack';
export interface StyleSlots {
    critical: string[];
    stylesheet: string[];
    preload: string[];
    prefetch: string[];
}
export declare type cssLoadingPriorities = keyof StyleSlots;
export interface OptionsStyleSlots {
    stylesSlots: StyleSlots;
}
export declare type IndexHtmlTransformOption = JsonObject & OptionsStyleSlots;
export declare type WebpackConfigTransformOption = Configuration & OptionsStyleSlots;
//# sourceMappingURL=model.d.ts.map