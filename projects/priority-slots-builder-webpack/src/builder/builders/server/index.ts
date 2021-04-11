import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import {
  executeBrowserBuilder,
  executeServerBuilder,
  ServerBuilderOptions,
} from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { loadOptions } from '../../custom-builder/utils';
import {CustomWebpackBuilderOptions, getTransforms} from '../../custom-builder';
import { mergeRxaStylesIntoAngularStyles } from '../../styles-slots/merge-options';

export type CustomWebpackServerSchema = ServerBuilderOptions &
  CustomWebpackBuilderOptions;

export function buildCustomWebpackServer(
  options: CustomWebpackServerSchema,
  context: any
): Observable<BuilderOutput> {
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

export default createBuilder<json.JsonObject & CustomWebpackServerSchema>(
  buildCustomWebpackServer
);
