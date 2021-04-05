"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexHtmlTransformFactory = void 0;
const utils_1 = require("../utils");
const core_1 = require("@angular-devkit/core");
function indexHtmlTransformFactory(options, context) {
    const { indexTransform, tsConfig } = options;
    const { workspaceRoot, target } = context;
    // if custom indexTransform is set in angular.json use them first
    if (!indexTransform) {
        return (indexHtml) => Promise.resolve(indexHtml);
    }
    utils_1.tsNodeRegister(indexTransform, `${core_1.getSystemPath(core_1.normalize(workspaceRoot))}/${tsConfig}`);
    const indexModule = require(`${core_1.getSystemPath(core_1.normalize(workspaceRoot))}/${indexTransform}`);
    const transform = indexModule.default || indexModule;
    return (indexHtml) => transform(target, indexHtml);
}
exports.indexHtmlTransformFactory = indexHtmlTransformFactory;
//# sourceMappingURL=index-html-transform.factory.js.map