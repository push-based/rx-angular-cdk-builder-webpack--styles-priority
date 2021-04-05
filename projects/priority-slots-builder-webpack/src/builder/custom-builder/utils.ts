import { from, Observable, of, zip } from 'rxjs';
import {
  BuilderContext,
  targetFromTargetString,
} from '@angular-devkit/architect';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import { map, switchMap } from 'rxjs/operators';
import { hasOwnProperty } from 'tslint/lib/utils';
import * as fs from 'fs';
import { existsSync, readFileSync } from 'fs';

export function fromTargetOptions(
  context: BuilderContext,
  browserTarget: string
): Observable<JsonObject> {
  const target = targetFromTargetString(browserTarget);
  return from(context.getTargetOptions(target));
}

export function mergeOptions<T>(
  options: T,
  context: BuilderContext
): Observable<T> {
  /*
      The way the options are resolved when executing a target is
      - by taking the default options object
      - then overwriting values from the configuration used (if any)
      - browserTarget: options
      - then overwriting values from the Angular CLI overrides object built from command line arguments

      This is then validated against the schema of the builder, and only then,
      if valid, the context will be created and the builder itself will execute.
      */
  const optionsSourceOverriddenByConsole$ = of(options);
  const optionsRemote$ = optionsSourceOverriddenByConsole$.pipe(
    switchMap((options) => {
      return 'browserTarget' in options
        ? fromTargetOptions(context, options['browserTarget'])
        : of({});
    })
  );
  return zip(optionsRemote$, optionsSourceOverriddenByConsole$).pipe(
    map(
      ([remoteOptions, sourceOptions]) =>
        (mergeTargetOptions(
          remoteOptions as any,
          sourceOptions as any
        ) as unknown) as T
    )
  );
}

export function mergeTargetOptions(
  targetOptionsBase: JsonObject,
  targetOptionsApply: JsonObject,
  mergeStrategies: any = {},
  replacePlugins = false
): { [key: string]: any } {
  const parsedOptionsToApply = Object.entries(targetOptionsApply)

    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key as any]: value }), {});
  const mergedTargetOption = {
    ...targetOptionsBase,
    ...parsedOptionsToApply,
  };
  // special cases here

  return mergedTargetOption;
}

export function resolveExport(path: string): any {
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

/**
 * Ensures the file exists before reading it
 */
export function readFile(path: string): string {
  if (existsSync(path)) {
    return readFileSync(path, 'utf-8');
  }
  return '';
}

export function resolveFileContent(path: string): string {
  const fileContent = readFile(path) || '';

  return fileContent;
}

/**
 * check for TS node registration
 * @param file: file name or file directory are allowed
 * @todo tsNodeRegistration: require ts-node if file extension is TypeScript
 */
export function tsNodeRegister(file: string = '', tsConfig?: string) {
  if (file && file.endsWith('.ts')) {
    // Register TS compiler lazily
    require('ts-node').register({
      project: tsConfig,
      compilerOptions: {
        module: 'CommonJS',
        types: [
          'node', // NOTE: `node` is added because users scripts can also use pure node's packages as webpack or others
        ],
      },
    });

    // Register paths in tsConfig
    const tsconfigPaths = require('tsconfig-paths');
    const { absoluteBaseUrl: baseUrl, paths } = tsconfigPaths.loadConfig(
      tsConfig
    );
    if (baseUrl && paths) {
      tsconfigPaths.register({ baseUrl, paths });
    }
  }
}

export function coercePromise<T>(p: Promise<T> | T): Promise<T> {
  if (hasOwnProperty(p, 'then')) {
    return (p as unknown) as Promise<T>;
  }
  return Promise.resolve(p) as Promise<T>;
}

export function readDir(dir: string): string[] {
  return fs.readdirSync(dir);
}

