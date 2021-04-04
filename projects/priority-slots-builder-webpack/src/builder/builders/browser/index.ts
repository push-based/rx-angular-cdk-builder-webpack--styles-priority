import { BuilderOutputLike, createBuilder } from '@angular-devkit/architect';
import {
  BrowserBuilderOptions,
  executeBrowserBuilder,
} from '@angular-devkit/build-angular';
import { JsonObject } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { mergeOptions } from '../../custom-builder/utils';
import {
  CustomWebpackBuilderOptions,
  getTransforms,
} from '../../custom-builder';

export type CustomWebpackBrowserSchema = BrowserBuilderOptions & CustomWebpackBuilderOptions;

export function buildCustomWebpackBrowser(
  options: CustomWebpackBrowserSchema,
  context: any
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
