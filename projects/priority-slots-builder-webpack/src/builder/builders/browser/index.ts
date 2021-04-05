import { BuilderOutputLike, createBuilder } from '@angular-devkit/architect';
import { executeBrowserBuilder } from '@angular-devkit/build-angular';
import { JsonObject } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { mergeOptions } from '../../custom-builder/utils';
import {
  CustomWebpackBuilderOptions,
  getTransforms,
} from '../../custom-builder';
import { Schema as BrowserBuilderSchema } from '@angular-devkit/build-angular/src/browser/schema';

export type CustomWebpackBrowserSchema = BrowserBuilderSchema &
  CustomWebpackBuilderOptions;

export function buildCustomWebpackBrowser(
  options: CustomWebpackBrowserSchema,
  context: any //BuilderContext
): Observable<BuilderOutputLike> {
  return mergeOptions(options, context).pipe(
    switchMap((customWebpackOptions) =>
      executeBrowserBuilder(
        customWebpackOptions,
        context,
        getTransforms(customWebpackOptions, context)
      )
    )
  );
}

export default createBuilder<JsonObject & CustomWebpackBrowserSchema>(
  buildCustomWebpackBrowser
);
