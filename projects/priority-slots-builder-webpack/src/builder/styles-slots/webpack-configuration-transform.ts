import { BuilderContext } from '@angular-devkit/architect';
import { StyleSlots } from './model';
import { ExecutionTransformer, ExtraEntryPoint } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
import {
  NormalizedEntryPoint,
  normalizeExtraEntryPoints
} from '@angular-devkit/build-angular/src/webpack/utils/helpers';
import { JsonObject } from '@angular-devkit/core';
import { ExtraEntryPointClass } from '@angular-devkit/build-angular/src/browser/schema';

export function webpackConfigurationTransform(
  stylesSlots: StyleSlots
): ExecutionTransformer<Configuration> {
  return (webpackConfig: Configuration): Promise<Configuration> => {
    const { entry } = webpackConfig as {entry: JsonObject};
    webpackConfig.entry = { ...entry, ...stylesSlots };
    console.log('new entry: ', webpackConfig.entry);
    return Promise.resolve(webpackConfig);
  };
}


/**
 * @TODO turn string[] of urls into Angular ExtraEntryPointClass and return them to later add them to wpc.entry
 * @TODO ensure no file is included twice
 *
 * @param stylesSlots
 */
export function generateEntryPoints(stylesSlots: StyleSlots): StyleSlots {
  // Add all styles/scripts, except lazy-loaded ones.
  const extraEntryPoints = (
    extraEntryPoints: ExtraEntryPoint[],
    defaultBundleName: string,
  ): string[] => {
    const entryPointNames: string[] = normalizeExtraEntryPoints(extraEntryPoints, defaultBundleName)
      .filter(entry => entry.inject)
      .map(entry => entry.bundleName);

    // remove duplicates
    return Array.from(new Set(entryPointNames));
  };

  const {critical, stylesheet,preload, prefetch} = stylesSlots;
  const allUrls = Object.values(stylesSlots).reduce((acc, arr) => [...acc, ...arr], []);
  ensureUniqueness(allUrls, 'Multiple style urls are the same across the different slots')


  const entryPoints: StyleSlots = {
    critical: critical ? extraEntryPoints(critical, 'critical') : [],
    stylesheet: (stylesheet ? extraEntryPoints(stylesheet, 'stylesheet') : []),
    preload: (preload ? extraEntryPoints(preload, 'preload') : []),
    prefetch: (prefetch ? extraEntryPoints(prefetch, 'prefetch') : []),
  };

  return entryPoints;
}


/**
 *
 */
function ensureUniqueness(urls: string[], error: string) {

  const duplicates = Array.from(new Set(urls.filter(x => urls.indexOf(x) !== urls.lastIndexOf(x))));

  if (duplicates.length > 0) {
    throw new Error(`${error}: '${duplicates.join(`', '`)}'.`);
  }

}
