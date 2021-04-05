import { BuilderContext } from '@angular-devkit/architect';
import { Configuration } from 'webpack';
import { CustomWebpackBuilderOptions } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
export declare function webpackConfigurationTransformFactory(options: CustomWebpackBuilderOptions, context: BuilderContext): ExecutionTransformer<Configuration>;
//# sourceMappingURL=webpack-configuration-transform.factory.d.ts.map