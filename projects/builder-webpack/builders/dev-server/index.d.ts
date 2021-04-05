import { DevServerBuilderOptions, DevServerBuilderOutput } from '@angular-devkit/build-angular';
import { Observable } from 'rxjs';
import { CustomWebpackBuilderOptions } from '../../custom-builder';
declare type ExtDevServerBuilderOptions = DevServerBuilderOptions & CustomWebpackBuilderOptions;
export declare const serveCustomWebpackBrowser: (options: ExtDevServerBuilderOptions, context: any) => Observable<DevServerBuilderOutput>;
declare const _default: import("@angular-devkit/architect/src/internal").Builder<ExtDevServerBuilderOptions>;
export default _default;
//# sourceMappingURL=index.d.ts.map