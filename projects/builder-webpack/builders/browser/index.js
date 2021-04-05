"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCustomWebpackBrowser = void 0;
const architect_1 = require("@angular-devkit/architect");
const build_angular_1 = require("@angular-devkit/build-angular");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../../custom-builder/utils");
const custom_builder_1 = require("../../custom-builder");
function buildCustomWebpackBrowser(options, context //BuilderContext
) {
    return utils_1.mergeOptions(options, context).pipe(operators_1.switchMap((customWebpackOptions) => build_angular_1.executeBrowserBuilder(customWebpackOptions, context, custom_builder_1.getTransforms(customWebpackOptions, context))));
}
exports.buildCustomWebpackBrowser = buildCustomWebpackBrowser;
exports.default = architect_1.createBuilder(buildCustomWebpackBrowser);
//# sourceMappingURL=index.js.map