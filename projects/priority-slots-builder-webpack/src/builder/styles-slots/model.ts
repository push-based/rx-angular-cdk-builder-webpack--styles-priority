import { JsonObject } from '@angular-devkit/core';
import { Configuration } from 'webpack';

export interface LazyStylesObject {
  input: string | string[],
  bundleName: string
}

export type stylesPriority = 'critical' | 'stylesheet' | 'preload' | 'prefetch'
export interface EagerStylesObject extends LazyStylesObject {
  priority: stylesPriority
}

export interface RxaStyleSlots {
  base: EagerStylesObject[],
  aboveTheFold: EagerStylesObject[],
  thirdParty: EagerStylesObject[],
  main: EagerStylesObject[],
  lowPrio: EagerStylesObject[],
}

export type styleSlots = keyof RxaStyleSlots;

export interface RxaStyle extends  RxaStyleSlots {
  notInjected: LazyStylesObject[]
}



export interface OptionsStyleSlots {
  rxaStyles: RxaStyle
}

export type IndexHtmlTransformOption = JsonObject & OptionsStyleSlots
export type WebpackConfigTransformOption = Configuration & OptionsStyleSlots

