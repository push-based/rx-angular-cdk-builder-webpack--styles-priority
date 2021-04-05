import { JsonObject } from '@angular-devkit/core';
import { Configuration } from 'webpack';

export interface StyleSlots {
  critical: string[],
  stylesheet: string[],
  preload: string[],
  prefetch: string[]
}
export type cssLoadingPriorities = keyof StyleSlots;



export interface OptionsStyleSlots {
  stylesSlots: StyleSlots
}

export type IndexHtmlTransformOption = JsonObject & OptionsStyleSlots
export type WebpackConfigTransformOption = Configuration & OptionsStyleSlots

