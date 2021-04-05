"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransforms = void 0;
const index_html_transform_factory_1 = require("./index-html-transform.factory");
const webpack_configuration_transform_factory_1 = require("./webpack-configuration-transform.factory");
function getTransforms(options, context) {
    return {
        webpackConfiguration: webpack_configuration_transform_factory_1.webpackConfigurationTransformFactory(options, context),
        indexHtml: index_html_transform_factory_1.indexHtmlTransformFactory(options, context),
    };
}
exports.getTransforms = getTransforms;
//# sourceMappingURL=transforms.js.map