import { BuilderOutput } from '@angular-devkit/architect';
import { ServerBuilderOptions } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';
export declare type CustomWebpackServerSchema = ServerBuilderOptions;
export declare function buildCustomWebpackServer(options: CustomWebpackServerSchema, context: any): Observable<BuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<json.JsonObject & ServerBuilderOptions>;
export default _default;
//# sourceMappingURL=index.d.ts.map