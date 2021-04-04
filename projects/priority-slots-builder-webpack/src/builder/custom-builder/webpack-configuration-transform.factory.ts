import { BuilderContext } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { CustomWebpackBuilderOptions } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { webpackConfigurationTransformFactory as slotsWebpackConfigurationTransformFactory } from '../styles-slots';

export const webpackConfigurationTransformFactory: (
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
) => ExecutionTransformer<JsonObject> = (options, context) => {
  const slotsWebpackConfigurationTransform = slotsWebpackConfigurationTransformFactory(options, context)
  return <T>(webpackConfig: JsonObject) => {
    return slotsWebpackConfigurationTransform(webpackConfig);
  };
};
