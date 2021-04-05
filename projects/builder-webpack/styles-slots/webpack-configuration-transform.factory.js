"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackConfigurationTransformFactory = void 0;
const webpack_configuration_transform_1 = require("./webpack-configuration-transform");
function webpackConfigurationTransformFactory(options, context) {
    const { stylesSlots } = options;
    return webpack_configuration_transform_1.webpackConfigurationTransform(stylesSlots);
}
exports.webpackConfigurationTransformFactory = webpackConfigurationTransformFactory;
//# sourceMappingURL=webpack-configuration-transform.factory.js.map