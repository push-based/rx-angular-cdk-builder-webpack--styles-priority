import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import {
  executeServerBuilder,
  ServerBuilderOptions,
} from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { mergeOptions } from '../../custom-builder/utils';

export type CustomWebpackServerSchema = ServerBuilderOptions;

export function buildCustomWebpackServer(
  options: CustomWebpackServerSchema,
  context: any
): Observable<BuilderOutput> {
  return mergeOptions(options, context).pipe(
    switchMap((customWebpackOptions) =>
      executeServerBuilder(customWebpackOptions, context)
    )
  );
}

export default createBuilder<json.JsonObject & CustomWebpackServerSchema>(
  buildCustomWebpackServer
);
