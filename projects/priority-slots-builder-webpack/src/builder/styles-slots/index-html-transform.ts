import * as jsdom from 'jsdom';
import {
  cssLoadingPriorities,
  IndexHtmlTransformOption,
  StyleSlots,
} from './model';
import { resolveFileContent } from '../custom-builder/utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { JSDOM } = jsdom;

const criticalSlotElement = (document: Document): Element => {
  const elems = document.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "critical" not present`);
  }
  return defaultElem;
};

const stylesheetSlotElement = (document: Document): Element => {
  const elems = document.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "stylesheet" not present`);
  }

  return defaultElem;
};

const preloadSlotElement = (document: Document): Element => {
  const elems = document.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "preload" not present`);
  }

  return defaultElem;
};

const prefetchSlotElement = (document: Document): Element => {
  const elems = document.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "prefetch" not present`);
  }

  return defaultElem;
};

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
export function indexHtmlTransform(
  options$: Observable<IndexHtmlTransformOption>,
  indexHtmlContent: string
): Promise<string> {
  return options$
    .pipe(
      map((options) => {
        const { stylesSlots } = options;
        const { critical, stylesheet, preload, prefetch } = stylesSlots;
        const dom = new JSDOM(indexHtmlContent);
        const { document } = dom.window;

        const { extractCss } = options;

        // remove angular placed main styles
        document.querySelector(`link[href^="styles."]`).remove()

        if (critical) {
          getLastSlotElement('critical', criticalSlotElement, document).prepend(
            htmlToElement(getStylesTags(critical, 'critical'))
          );
        }

        if (stylesheet) {
          getLastSlotElement(
            'stylesheet',
            stylesheetSlotElement,
            document
          ).appendChild(htmlToElement(getStylesTags(stylesheet, 'stylesheet')));
        }

        if (preload) {
          getLastSlotElement(
            'preload',
            preloadSlotElement,
            document
          ).appendChild(htmlToElement(getStylesTags(preload, 'preload')));
        }

        if (prefetch) {
          getLastSlotElement(
            'prefetch',
            prefetchSlotElement,
            document
          ).appendChild(htmlToElement(getStylesTags(prefetch, 'prefetch')));
        }

        return dom.serialize();

        // ===============

        function htmlToElement(html: string): Element {
          const template = document.createElement('template');
          html = html.trim(); // Never return a text node of whitespace as the result
          template.innerHTML = html;
          return template.content.firstChild as Element;
        }
      })
    )
    .toPromise();
}

function getLastSlotElement(
  slotName: string,
  defaultElement: (indexHtml: Document) => Element,
  document: HTMLDocument
): Element {
  const elems: NodeListOf<HTMLElement> = document.querySelectorAll(
    `[data-stylesSlots="${slotName}"]`
  );
  // default styles slot already placed
  if (elems.length > 0) {
    return elems[elems.length - 1];
  }
  // use default styles slot
  // eslint-disable-next-line no-restricted-syntax
  return defaultElement(document);
}

function getStylesTags(
  url: string | string[],
  slotName: keyof StyleSlots = 'prefetch'
) {
  const urls = Array.isArray(url) ? url : [url];
  let format: (url: string) => string;
  switch (slotName) {
    case 'critical':
      format = (url) => style(slotName, url);
      break;
    case 'stylesheet':
    case 'preload':
    case 'prefetch':
      format = (url) => link(slotName, url);
      break;
  }

  return urls.map((url) => format(url)).join('');

  function link(
    slotName: Omit<cssLoadingPriorities, 'critical'>,
    url: string
  ): string {
    const asAttribute = url.split('.').pop() === 'css' ? 'as="style"' : 'as="script"';
    return `<link rel="${slotName}" data-stylseSlot="${slotName}" href="${url}" ${
      slotName !== 'stylesheet' ? asAttribute : ''
    }/>`;
  }

  function style(slotName: 'critical', url: string): string {
    const inlineStylesContent = '.todo-inline-styles-here {}'; //resolveFileContent(url);
    return `<style data-stylseSlot="${slotName}">${inlineStylesContent}</style>`;
  }
}
