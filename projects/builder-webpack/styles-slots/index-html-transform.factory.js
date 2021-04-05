"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexHtmlTransformFactory = void 0;
const index_html_transform_1 = require("./index-html-transform");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../custom-builder/utils");
function indexHtmlTransformFactory(options, context) {
    const { stylesSlots, extractCss } = options;
    const { target: targetOptions } = context;
    const usedSlots = Object.keys(stylesSlots);
    console.log('extractCss', options.extractCss);
    const filterFiles = (file) => (slot) => file.match(`(${slot}?[^\\s]+\\.${extractCss ? 'css' : 'js'})`);
    const enrichedTargetOptions$ = rxjs_1.defer(() => rxjs_1.from(context.getTargetOptions(targetOptions))).pipe(operators_1.map(({ outputPath }) => {
        console.log('new slots: ', getStylesSlots(outputPath, usedSlots, filterFiles));
        return Object.assign(Object.assign({}, options), { stylesSlots: getStylesSlots(outputPath, usedSlots, filterFiles) });
    }));
    return (indexHtml) => {
        return index_html_transform_1.indexHtmlTransform(enrichedTargetOptions$, indexHtml);
    };
}
exports.indexHtmlTransformFactory = indexHtmlTransformFactory;
function getStylesSlots(outputPath, usedSlots, filterFiles) {
    return utils_1.readDir(outputPath)
        .filter((file) => usedSlots.some(filterFiles))
        .reduce((slots, file) => {
        slots[file.split('.').shift()] = file;
        return slots;
    }, {});
}
//# sourceMappingURL=index-html-transform.factory.js.map