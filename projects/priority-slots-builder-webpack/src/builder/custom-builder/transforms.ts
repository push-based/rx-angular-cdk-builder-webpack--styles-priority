import { BuilderContext } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Stats } from 'webpack';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { indexHtmlTransformFactory } from './index-html-transform.factory';
import { CustomWebpackBuilderOptions } from './model';
import { webpackConfigurationTransformFactory } from './webpack-configuration-transform.factory';

export function getTransforms(
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
): {
  webpackConfiguration?: ExecutionTransformer<any>;
  logging?: WebpackLoggingCallback;
  indexHtml?: IndexHtmlTransform;
} {
  return {
    logging: (stats: Stats, config: any) => {
      console.log('logging: ', stats, config);
    },
    webpackConfiguration: webpackConfigurationTransformFactory(
      options,
      context
    ),
    indexHtml: indexHtmlTransformFactory(options, context),
  };
}
