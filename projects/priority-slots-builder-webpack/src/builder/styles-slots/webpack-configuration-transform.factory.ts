import { BuilderContext } from '@angular-devkit/architect';
import { OptionsStyleSlots, WebpackConfigTransformOption } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
import { webpackConfigurationTransform } from './webpack-configuration-transform';
import { CustomWebpackBuilderOptions } from '../custom-builder';

export function webpackConfigurationTransformFactory(
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
): ExecutionTransformer<Configuration> {
  return webpackConfigurationTransform(options.rxaStyles);
}
