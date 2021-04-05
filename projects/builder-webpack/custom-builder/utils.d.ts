import { Observable } from 'rxjs';
import { BuilderContext } from '@angular-devkit/architect';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
export declare function fromTargetOptions(context: BuilderContext, browserTarget: string): Observable<JsonObject>;
export declare function mergeOptions<T>(options: T, context: BuilderContext): Observable<T>;
export declare function mergeTargetOptions(targetOptionsBase: JsonObject, targetOptionsApply: JsonObject, mergeStrategies?: any, replacePlugins?: boolean): {
    [key: string]: any;
};
export declare function resolveExport(path: string): any;
/**
 * Ensures the file exists before reading it
 */
export declare function readFile(path: string): string;
export declare function resolveFileContent(path: string): string;
/**
 * check for TS node registration
 * @param file: file name or file directory are allowed
 * @todo tsNodeRegistration: require ts-node if file extension is TypeScript
 */
export declare function tsNodeRegister(file?: string, tsConfig?: string): void;
export declare function coercePromise<T>(p: Promise<T> | T): Promise<T>;
export declare function readDir(dir: string): string[];
//# sourceMappingURL=utils.d.ts.map