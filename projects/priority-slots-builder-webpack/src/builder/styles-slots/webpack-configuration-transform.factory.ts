import { BuilderContext } from '@angular-devkit/architect';
import {
  WebpackConfigTransformOption,
} from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { JsonObject } from '@angular-devkit/core';

export const webpackConfigurationTransformFactory: (
  options: WebpackConfigTransformOption,
  context: BuilderContext
) => ExecutionTransformer<JsonObject> = (options, context) => {
  return <T>(webpackConfig: T) => {
    console.log('webpackConfig: ', webpackConfig);
    return Promise.resolve(webpackConfig);
  };
};
