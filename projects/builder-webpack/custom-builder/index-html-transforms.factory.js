"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexHtmlTransformFactory = void 0;
const defaults_1 = require("./defaults");
const styles_slots_1 = require("../styles-slots");
const indexHtmlTransformFactory = (options, context) => {
    const { target } = context;
    const defaultTransform = defaults_1.indexHtmlTransformFactory(options, context);
    const stylesSlotsTransform = styles_slots_1.indexHtmlTransformFactory(options, context);
    return (indexHtml) => {
        return defaultTransform(indexHtml)
            .then((r) => stylesSlotsTransform(r));
    };
};
exports.indexHtmlTransformFactory = indexHtmlTransformFactory;
//# sourceMappingURL=index-html-transforms.factory.js.map