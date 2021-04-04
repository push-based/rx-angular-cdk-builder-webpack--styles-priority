import { Path, JsonObject } from '@angular-devkit/core';
import { merge as mergeConfigs } from 'webpack-merge';
import { setupStylesBundles } from './index';

export function adoptWebpackConfig(
    root: Path,
    baseWebpackConfig: JsonObject,
    buildOptions: JsonObject
  ): JsonObject {
    if (!buildOptions) {
      return baseWebpackConfig;
    }

    if (buildOptions.stylesSlots === undefined) {
      return baseWebpackConfig;
    }

    return mergeConfigs(
      baseWebpackConfig,
      setupStylesBundles(baseWebpackConfig, buildOptions),
      { entry: 'replace' },
      true
    );
}
