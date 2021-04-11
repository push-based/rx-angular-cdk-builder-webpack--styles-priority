import { OptionsStyleSlots } from '../styles-slots';
import { JsonObject } from '@angular-devkit/core';
import { EntryObject } from 'webpack';
import { ExtraEntryPoint } from '@angular-devkit/build-angular';
import { Schema as RealWebpackBuilderSchema } from '@angular-devkit/build-webpack/src/webpack/schema';
export type WebpackBuilderSchema = RealWebpackBuilderSchema & JsonObject;

type EntryStatic = string | EntryObject | string[];

export type CustomWebpackBuilderOptions = JsonObject & WebpackBuilderSchema & OptionsStyleSlots;
export type WebpackEntry = string | (() => string | EntryObject | string[] | Promise<EntryStatic>) | EntryObject | string[];

export interface WebpackEntryConfig {
  entry: Record<string, ExtraEntryPoint>
}

export type PropName<T> = keyof T;
export type PropType<T> = T[PropName<T>];

/**
 * Type specifying and objects keys types
 */
export type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
    ? []
    : T extends Array<any> | string
      ? string[]
      : never;

/**
 * Type specifying and objects values types
 */
export type ObjectValues<T> = T extends object
  ? (T[keyof T])[]
      : never;

/**
 * Type specifying and objects keys types
 */
export type ObjectEntry<T> = [keyof T, T[keyof T]];

/**
 * Type specifying and objects entries types
 */
export type ObjectEntries<T> = T extends object
  ? ([keyof T, T[keyof T]])[]
   : T extends number
    ? [number, T[keyof T]]
   // : T extends Array<any> | string
 //     ? string[]
      : never;


/**
 * typed Object constructor (ATM only for the key method)
 *
 * @example
 * const keys: 'prop1' | 'prop2' = (Object as ObjectConstructor).keys({prop1: 1, prop2: 2});
 */
export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
  values<T>(o: T): ObjectValues<T>;
  entries<T>(o: T): ObjectEntries<T>;
}

export const TypedObject: ObjectConstructor = Object;

/**
 * Typed reducer function for the `Array#reduce` method.
 */
export type ArrayReducerFn<T extends Record<string, any>> = (
  acc: T,
  cur?: PropType<T>,
  idx?: number
) => T;
