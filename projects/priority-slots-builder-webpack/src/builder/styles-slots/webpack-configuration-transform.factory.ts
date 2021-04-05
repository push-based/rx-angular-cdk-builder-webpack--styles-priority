import { BuilderContext } from '@angular-devkit/architect';
import { WebpackConfigTransformOption } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
import { webpackConfigurationTransform } from './webpack-configuration-transform';

export function webpackConfigurationTransformFactory(
  options: WebpackConfigTransformOption,
  context: BuilderContext
): ExecutionTransformer<Configuration> {
  const { stylesSlots } = options;
  return webpackConfigurationTransform(stylesSlots);
}
