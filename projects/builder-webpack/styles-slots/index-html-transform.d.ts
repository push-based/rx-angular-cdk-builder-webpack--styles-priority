import { IndexHtmlTransformOption } from './model';
import { Observable } from 'rxjs';
/**
 * This functions places named slots in the passed HTML document to enable easy and intuitive lazy loading of styles.
 *
 * The slots are grouped by possible loading priorities in the browser. To give the developer the chance to compose the
 * applications styles fine-grained, multiple slots are provided under one priority.
 *
 ** **Render-blocking** (one file in prod mode):
 * - defaults
 * - above-the-fold
 *
 * **Preloaded** (one file in prod mode):
 * - third-party
 * - main
 *
 * **Prefethed** (one files in prod mode):
 * - low-priority
 *
 * # Default Slot
 *
 * - render-blocking => <style></style>
 * - framework/third-party independent basics which everything else build up on
 * - browser default
 * - base styling
 *
 * # AboveTheFold Slot
 * - render-blocking => <style></style>
 * - Render blocking styles here to provide initial meaningful pain (duplicates/redundance of later loaded styles)
 *
 * # ThirdParty Slot
 * - When should you
 * - render-non-blocking => <link rel="preload" href="style.css" as="style">
 * - sibling styles are independent
 * - this styles will get overridden/customized later
 *
 * # Main Slot
 * Use `rel="preload"` as this resources have high-confidence to be used in the current page.
 *
 * - render-blocking => <style></style>
 * - sibling styles are independent (do not bleed into each other)
 * - order also independent e.g. main.css before calendar-custom.css
 *
 * # LowPriority Slot
 * Use `rel="prefetch"` as it is likely to be used for future navigations across multiple navigation boundaries.
 *
 * - non-render-blocking `<link rel="prefetch" href="style.css" as="style">`
 * - encapsulated styles (web component like)
 * - independent customizations/overrides
 * - lazy routes
 * - lazy components
 *
 * @Example
 *
 * <!doctype html>
 * <html lang="en">
 *  <head>
 *    <!-- ®✖🅰 CRITICAL - render-blocking inline styles -->
 *    <styles id="styles-prio--critical"></styles>
 *
 *    <meta charset="utf-8">
 *    <base href="/">
 *    <meta name="viewport" content="width=device-width, initial-scale=1">
 *    <link rel="icon" type="image/x-icon" href="favicon.ico">
 *
 *    <!-- ®✖🅰 STYLESHEET - render-blocking styles -->
 *    <link rel="stylesheet" id="styles-prio--stylesheet" href=""></link>
 *
 *    <!-- 🅰 STYLES START -->
 *    <!-- 👇 MAIN 👇 -->
 *    <link rel="stylesheet" id="main" href="" />
 *
 *    <!-- 🅰 ANGULAR styles as css (in prod mode) -->
 *    <link rel="stylesheet" href="">
 *    <!-- 🅰 STYLES END -->
 *    <!-- ®✖🅰 PRELOAD (one file in prod mode) -->
 *    <!-- 👇 MAIN 👇 -->
 *    <link rel="preload" id="main" href="" as="styles"></link>
 *
 *    <!-- ®✖🅰 PREFETCH (one file in prod mode) -->
 *    <!-- 👇 LOW PRIORITY 👇 -->
 *    <link rel="prefetch" id="low-priority" href="" as="styles"></link>
 *  </head>
 *  <body>
 *    <app-root></app-root>
 *
 *
 *    <!-- 🅰 SCRIPTS START -->
 *    <!-- 🅰 ANGULAR styles as JS (in dev mode) -->
 *    <script src="styles.js" defer></script>
 *    <!-- 🅰 SCRIPTS END -->
 *  </body>
 * </html>
 *
 * @param options
 * @param indexHtmlContent
 *
 * @returns new indexHtml string
 */
export declare function indexHtmlTransform(options$: Observable<IndexHtmlTransformOption>, indexHtmlContent: string): Promise<string>;
//# sourceMappingURL=index-html-transform.d.ts.map