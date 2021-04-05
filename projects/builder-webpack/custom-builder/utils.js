"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDir = exports.coercePromise = exports.tsNodeRegister = exports.resolveFileContent = exports.readFile = exports.resolveExport = exports.mergeTargetOptions = exports.mergeOptions = exports.fromTargetOptions = void 0;
const rxjs_1 = require("rxjs");
const architect_1 = require("@angular-devkit/architect");
const operators_1 = require("rxjs/operators");
const utils_1 = require("tslint/lib/utils");
const fs = require("fs");
const fs_1 = require("fs");
function fromTargetOptions(context, browserTarget) {
    const target = architect_1.targetFromTargetString(browserTarget);
    return rxjs_1.from(context.getTargetOptions(target));
}
exports.fromTargetOptions = fromTargetOptions;
function mergeOptions(options, context) {
    /*
        The way the options are resolved when executing a target is
        - by taking the default options object
        - then overwriting values from the configuration used (if any)
        - browserTarget: options
        - then overwriting values from the Angular CLI overrides object built from command line arguments
  
        This is then validated against the schema of the builder, and only then,
        if valid, the context will be created and the builder itself will execute.
        */
    const optionsSourceOverriddenByConsole$ = rxjs_1.of(options);
    const optionsRemote$ = optionsSourceOverriddenByConsole$.pipe(operators_1.switchMap((options) => {
        return 'browserTarget' in options
            ? fromTargetOptions(context, options['browserTarget'])
            : rxjs_1.of({});
    }));
    return rxjs_1.zip(optionsRemote$, optionsSourceOverriddenByConsole$).pipe(operators_1.map(([remoteOptions, sourceOptions]) => mergeTargetOptions(remoteOptions, sourceOptions)));
}
exports.mergeOptions = mergeOptions;
function mergeTargetOptions(targetOptionsBase, targetOptionsApply, mergeStrategies = {}, replacePlugins = false) {
    const parsedOptionsToApply = Object.entries(targetOptionsApply)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    const mergedTargetOption = Object.assign(Object.assign({}, targetOptionsBase), parsedOptionsToApply);
    // special cases here
    return mergedTargetOption;
}
exports.mergeTargetOptions = mergeTargetOptions;
function resolveExport(path) {
    if (path.endsWith('.ts')) {
        // Register TS compiler lazily
        require('ts-node').register({
            compilerOptions: {
                module: 'commonjs',
            },
        });
    }
    const result = require(path);
    // If the user provides a configuration in TS file
    // then there are 2 cases for exporting an object.
    //
    // The first one is:
    // `module.exports = { ... }`.
    // And the second one is:
    // `export default { ... }`.
    // The ESM format is compiled into:
    // `{ default: { ... } }`
    const resultExport = result.default || result;
    return resultExport;
}
exports.resolveExport = resolveExport;
/**
 * Ensures the file exists before reading it
 */
function readFile(path) {
    if (fs_1.existsSync(path)) {
        return fs_1.readFileSync(path, 'utf-8');
    }
    return '';
}
exports.readFile = readFile;
function resolveFileContent(path) {
    const fileContent = readFile(path) || '';
    return fileContent;
}
exports.resolveFileContent = resolveFileContent;
/**
 * check for TS node registration
 * @param file: file name or file directory are allowed
 * @todo tsNodeRegistration: require ts-node if file extension is TypeScript
 */
function tsNodeRegister(file = '', tsConfig) {
    if (file && file.endsWith('.ts')) {
        // Register TS compiler lazily
        require('ts-node').register({
            project: tsConfig,
            compilerOptions: {
                module: 'CommonJS',
                types: [
                    'node',
                ],
            },
        });
        // Register paths in tsConfig
        const tsconfigPaths = require('tsconfig-paths');
        const { absoluteBaseUrl: baseUrl, paths } = tsconfigPaths.loadConfig(tsConfig);
        if (baseUrl && paths) {
            tsconfigPaths.register({ baseUrl, paths });
        }
    }
}
exports.tsNodeRegister = tsNodeRegister;
function coercePromise(p) {
    if (utils_1.hasOwnProperty(p, 'then')) {
        return p;
    }
    return Promise.resolve(p);
}
exports.coercePromise = coercePromise;
function readDir(dir) {
    return fs.readdirSync(dir);
}
exports.readDir = readDir;
//# sourceMappingURL=utils.js.map