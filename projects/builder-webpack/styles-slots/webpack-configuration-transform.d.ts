import { StyleSlots } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
export declare function webpackConfigurationTransform(stylesSlots: StyleSlots): ExecutionTransformer<Configuration>;
/**
 * @TODO turn string[] of urls into Angular ExtraEntryPointClass and return them to later add them to wpc.entry
 * @TODO ensure no file is included twice
 *
 * @param stylesSlots
 */
export declare function generateEntryPoints(stylesSlots: StyleSlots): StyleSlots;
//# sourceMappingURL=webpack-configuration-transform.d.ts.map