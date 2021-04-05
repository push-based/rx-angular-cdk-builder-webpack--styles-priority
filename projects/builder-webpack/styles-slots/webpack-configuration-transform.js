"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntryPoints = exports.webpackConfigurationTransform = void 0;
const helpers_1 = require("@angular-devkit/build-angular/src/webpack/utils/helpers");
function webpackConfigurationTransform(stylesSlots) {
    return (webpackConfig) => {
        const { entry } = webpackConfig;
        webpackConfig.entry = Object.assign(Object.assign({}, entry), stylesSlots);
        console.log('new entry: ', webpackConfig.entry);
        return Promise.resolve(webpackConfig);
    };
}
exports.webpackConfigurationTransform = webpackConfigurationTransform;
/**
 * @TODO turn string[] of urls into Angular ExtraEntryPointClass and return them to later add them to wpc.entry
 * @TODO ensure no file is included twice
 *
 * @param stylesSlots
 */
function generateEntryPoints(stylesSlots) {
    // Add all styles/scripts, except lazy-loaded ones.
    const extraEntryPoints = (extraEntryPoints, defaultBundleName) => {
        const entryPointNames = helpers_1.normalizeExtraEntryPoints(extraEntryPoints, defaultBundleName)
            .filter(entry => entry.inject)
            .map(entry => entry.bundleName);
        // remove duplicates
        return Array.from(new Set(entryPointNames));
    };
    const { critical, stylesheet, preload, prefetch } = stylesSlots;
    const allUrls = Object.values(stylesSlots).reduce((acc, arr) => [...acc, ...arr], []);
    ensureUniqueness(allUrls, 'Multiple style urls are the same across the different slots');
    const entryPoints = {
        critical: critical ? extraEntryPoints(critical, 'critical') : [],
        stylesheet: (stylesheet ? extraEntryPoints(stylesheet, 'stylesheet') : []),
        preload: (preload ? extraEntryPoints(preload, 'preload') : []),
        prefetch: (prefetch ? extraEntryPoints(prefetch, 'prefetch') : []),
    };
    return entryPoints;
}
exports.generateEntryPoints = generateEntryPoints;
/**
 *
 */
function ensureUniqueness(urls, error) {
    const duplicates = Array.from(new Set(urls.filter(x => urls.indexOf(x) !== urls.lastIndexOf(x))));
    if (duplicates.length > 0) {
        throw new Error(`${error}: '${duplicates.join(`', '`)}'.`);
    }
}
//# sourceMappingURL=webpack-configuration-transform.js.map