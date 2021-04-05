"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCustomWebpackServer = void 0;
const architect_1 = require("@angular-devkit/architect");
const build_angular_1 = require("@angular-devkit/build-angular");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../../custom-builder/utils");
function buildCustomWebpackServer(options, context) {
    return utils_1.mergeOptions(options, context).pipe(operators_1.switchMap((customWebpackOptions) => build_angular_1.executeServerBuilder(customWebpackOptions, context)));
}
exports.buildCustomWebpackServer = buildCustomWebpackServer;
exports.default = architect_1.createBuilder(buildCustomWebpackServer);
//# sourceMappingURL=index.js.map