import { BuilderContext } from '@angular-devkit/architect';
import { Configuration } from 'webpack';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { indexHtmlTransformFactory } from './index-html-transform.factory';
import { CustomWebpackBuilderOptions } from './model';
import { webpackConfigurationTransformFactory } from './webpack-configuration-transform.factory';

export function getTransforms(
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
): {
  webpackConfiguration?: ExecutionTransformer<Configuration>;
  logging?: WebpackLoggingCallback;
  indexHtml?: IndexHtmlTransform;
} {
  return {
    webpackConfiguration: webpackConfigurationTransformFactory(
      options,
      context
    ),
    indexHtml: indexHtmlTransformFactory(options, context),
  };
}
