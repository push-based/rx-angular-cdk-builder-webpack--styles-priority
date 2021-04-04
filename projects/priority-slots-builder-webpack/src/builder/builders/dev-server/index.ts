import { createBuilder } from '@angular-devkit/architect';
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  executeDevServerBuilder,
} from '@angular-devkit/build-angular';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { mergeOptions } from '../../custom-builder/utils';
import {
  CustomWebpackBuilderOptions,
  getTransforms,
} from '../../custom-builder';

type ExtDevServerBuilderOptions = DevServerBuilderOptions &
  CustomWebpackBuilderOptions;

export const serveCustomWebpackBrowser = (
  options: ExtDevServerBuilderOptions,
  context: any
): Observable<DevServerBuilderOutput> => {
  return mergeOptions(options, context).pipe(
    switchMap((customWebpackOptions: any) =>
      executeDevServerBuilder(
        customWebpackOptions,
        context,
        getTransforms(customWebpackOptions, context)
      )
    )
  );
};

export default createBuilder<
  ExtDevServerBuilderOptions,
  DevServerBuilderOutput
>(serveCustomWebpackBrowser);
