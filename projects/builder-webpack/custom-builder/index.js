"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStylesBundles = exports.getTransforms = void 0;
var transforms_1 = require("./transforms");
Object.defineProperty(exports, "getTransforms", { enumerable: true, get: function () { return transforms_1.getTransforms; } });
function setupStylesBundles(cfg, variant) {
    const _a = cfg.entry, { polyfills, ['polyfills-es5']: polyfillsEs5, scripts, styles, main, runtime, vendor } = _a, other = __rest(_a, ["polyfills", 'polyfills-es5', "scripts", "styles", "main", "runtime", "vendor"]);
    if (true) {
        console.log('polyfills: ', polyfills);
        console.log('polyfillsEs5: ', polyfillsEs5);
        console.log('scripts: ', scripts);
        console.log('styles: ', styles);
        console.log('main: ', main);
        console.log('runtime: ', runtime);
        console.log('vendor: ', vendor);
        console.log('other: ', other);
    }
    return Object.assign(Object.assign({}, cfg), { entry: {
            main: []
                .concat(polyfills || [])
                .concat(scripts || [])
                // Never include styles
                // .concat(styles ? styles || [] : [])
                .concat(runtime || [])
                .concat(vendor || [])
                .concat(main || [])
        } });
}
exports.setupStylesBundles = setupStylesBundles;
//# sourceMappingURL=index.js.map