"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackConfigurationTransformFactory = void 0;
const styles_slots_1 = require("../styles-slots");
function webpackConfigurationTransformFactory(options, context) {
    const slotsWebpackConfigurationTransform = styles_slots_1.webpackConfigurationTransformFactory(options, context);
    return (webpackConfig) => {
        return slotsWebpackConfigurationTransform(webpackConfig);
    };
}
exports.webpackConfigurationTransformFactory = webpackConfigurationTransformFactory;
//# sourceMappingURL=webpack-configuration-transform.factory.js.map