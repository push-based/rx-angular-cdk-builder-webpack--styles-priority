import { BuilderContext } from '@angular-devkit/architect';
import { Configuration } from 'webpack';
import { CustomWebpackBuilderOptions } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { webpackConfigurationTransformFactory as slotsWebpackConfigurationTransformFactory } from '../styles-slots';

export function webpackConfigurationTransformFactory(
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
): ExecutionTransformer<Configuration> {
  const slotsWebpackConfigurationTransform = slotsWebpackConfigurationTransformFactory(
    options,
    context
  );
  return (
    webpackConfig: Configuration
  ): Promise<Configuration> | Configuration => {
    return slotsWebpackConfigurationTransform(webpackConfig);
  };
}
