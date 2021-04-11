import * as jsdom from 'jsdom';
import {
  IndexHtmlTransformOption,
  RxaStyleSlots,
  styleSlots,
  stylesPriority,
} from './model';
import { TypedObject } from '../custom-builder/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolveFileContent } from '../custom-builder/utils';

const { JSDOM } = jsdom;

const criticalSlotElement = (doc: Document): Element => {
  const elems = doc.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "critical" not present`);
  }
  return defaultElem;
};

const stylesheetSlotElement = (doc: Document): Element => {
  const elems = doc.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "stylesheet" not present`);
  }

  return defaultElem;
};

const preloadSlotElement = (doc: Document): Element => {
  const elems = doc.querySelectorAll('head');
  const defaultElem = elems[elems.length - 1];
  if (!defaultElem) {
    throw new Error(`Default slot element for slot "preload" not present`);
  }

  return defaultElem;
};

const prefetchSlotElement = (doc: Document): Element => {
  const elems = doc.querySelectorAll('head');
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
        const { rxaStyles } = options;
        const { notInjected, ...slots } = rxaStyles;
        const dom = new JSDOM(indexHtmlContent);
        const doc = dom.window.document;
        const { extractCss } = options;

        // remove angular placed main styles
        doc.querySelector(`link[href^="styles."]`).remove();

        if (Object.keys(slots).length > 0) {
          const o = TypedObject.entries(slots);
          o.forEach(([name, input]) => {
            const linkElem = getStylesTags(
              (input as unknown) as string,
              name,
              getSlotPriority(name)
            );
            placeLink(linkElem, name, 'after');
          });
        }

        return dom.serialize();

        // ===============

        function insertBefore(element: Element, htmlString: string) {
          return element.insertAdjacentHTML('beforebegin', htmlString);
        }

        function insertAfter(element: Element, htmlString: string) {
          return element.insertAdjacentHTML('afterend', htmlString);
        }

        function htmlToElement(html: string): Element {
          const template = doc.createElement('template');
          html = html.trim(); // Never return a text node of whitespace as the result
          template.innerHTML = html;
          return template.content.firstChild as Element;
        }

        function placeLink(
          link: string,
          slotName: styleSlots,
          placement: 'before' | 'after'
        ): void {
          const isBefore = placement === 'before';

          const slotElems: NodeListOf<HTMLElement> = doc.querySelectorAll(
            `[data-rxa-styles-slot="${slotName}"]`
          );

          // last element in head as default position
          const head = doc.querySelector(`head`);
          let existingSlotElement = head.children[head.children.length -1];

          // slot styles slot already placed
          if (slotElems.length > 0) {
            existingSlotElement = isBefore
              ? slotElems[0]
              : slotElems[slotElems.length - 1];
          }

          if (isBefore) {
            insertBefore(existingSlotElement, link);
            // existingSlotElement.prepend(htmlToElement(link));
          } else {
            insertAfter(existingSlotElement, link);
            // existingSlotElement.append(htmlToElement(link));
          }
        }
      })
    )
    .toPromise();
}

function getStylesTags(
  url: string | string[],
  slotName: keyof RxaStyleSlots,
  priority: stylesPriority = 'prefetch'
): string {
  const urls = Array.isArray(url) ? url : [url];
  let format: (url: string) => string;
  switch (priority) {
    case 'critical':
      format = (url) => style(url, slotName);
      break;
    case 'stylesheet':
    case 'preload':
    case 'prefetch':
      format = (url) => link(url, slotName, priority);
      break;
  }

  return urls.map((url) => format(url)).join('');

  function link(
    url: string,
    slotName: keyof RxaStyleSlots,
    priority: stylesPriority
  ): string {
    const asAttribute =
      url.split('.').pop() === 'css' ? 'as="style"' : 'as="script"';
    return `<link rel="${priority}" data-rxa-styles-slot="${slotName}" href="${url}" ${
      priority !== 'stylesheet' ? asAttribute : ''
    }/>`;
  }

  function style(url: string, slotName: styleSlots): string {
    const inlineStylesContent = resolveFileContent(url);
    return `<style data-rxa-styles-slot="${slotName}">${inlineStylesContent}</style>`;
  }
}

function getSlotPriority(slotName: styleSlots): stylesPriority {
  switch (slotName) {
    case 'aboveTheFold':
      return 'critical';
    case 'base':
    case 'thirdParty':
      return 'preload';
    case 'lowPrio':
      return 'prefetch';
    case 'main':
    default:
      return 'stylesheet';
  }
}
