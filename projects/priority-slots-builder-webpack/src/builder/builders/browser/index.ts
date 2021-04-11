import {
  BuilderContext,
  BuilderOutputLike,
  createBuilder,
} from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
import { JsonObject } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { loadOptions } from '../../custom-builder/utils';
import {
  CustomWebpackBuilderOptions,
  getTransforms,
} from '../../custom-builder';
import { Schema as BrowserBuilderSchema } from '@angular-devkit/build-angular/src/browser/schema';
import { mergeRxaStylesIntoAngularStyles } from '../../styles-slots/merge-options';

export type CustomWebpackBrowserSchema = BrowserBuilderSchema & CustomWebpackBuilderOptions;

export function buildCustomWebpackBrowser(
  options: CustomWebpackBrowserSchema,
  context: BuilderContext
): Observable<BuilderOutputLike> {
  return loadOptions(options, context).pipe(
    map(mergeRxaStylesIntoAngularStyles),
    switchMap((customWebpackOptions) =>
      executeBrowserBuilder(
        options,
        context as any, // @TODO fix typing
        getTransforms(customWebpackOptions, context)
      )
    )
  );
}

export default createBuilder<JsonObject & CustomWebpackBrowserSchema>(
  buildCustomWebpackBrowser
);
