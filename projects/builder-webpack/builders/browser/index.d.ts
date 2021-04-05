import { BuilderOutputLike } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { CustomWebpackBuilderOptions } from '../../custom-builder';
import { Schema as BrowserBuilderSchema } from '@angular-devkit/build-angular/src/browser/schema';
export declare type CustomWebpackBrowserSchema = BrowserBuilderSchema & CustomWebpackBuilderOptions;
export declare function buildCustomWebpackBrowser(options: CustomWebpackBrowserSchema, context: any): Observable<BuilderOutputLike>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<JsonObject & BrowserBuilderSchema & import("../../styles-slots").OptionsStyleSlots>;
export default _default;
//# sourceMappingURL=index.d.ts.map