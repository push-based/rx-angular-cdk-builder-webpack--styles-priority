import { BuilderContext } from '@angular-devkit/architect';
import { Configuration } from 'webpack';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { CustomWebpackBuilderOptions } from './model';
export declare function getTransforms(options: CustomWebpackBuilderOptions, context: BuilderContext): {
    webpackConfiguration?: ExecutionTransformer<Configuration>;
    logging?: WebpackLoggingCallback;
    indexHtml?: IndexHtmlTransform;
};
//# sourceMappingURL=transforms.d.ts.map