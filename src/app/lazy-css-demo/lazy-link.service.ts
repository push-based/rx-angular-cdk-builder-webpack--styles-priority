import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/**
 * These imports will resolve the file names to be lazy loaded on demand
 *
 * "file-loader" loads the file name of the desired import as it will be created in bundle using the name composition & placeholders
 * "sass-loader" needs to be appended to process SCSS file to CSS so it can be linked as transformed CSS file
 */
// tslint:disable-next-line:max-line-length
import lazyMarkdownStyles from '!!file-loader?name=[name].[contentHash].css!resolve-url-loader!sass-loader!./lazy-link-markdown-styles.scss';
// example of how import would look like with just CSS file
// import lazyQuillStyles from '!!file-loader?name=[name].[contentHash].css!quill/dist/quill.core.css';

export type LazyLinks =
  | 'lazy-markdown-styles';

interface LazyLinkMetadata {
  rel: 'stylesheet' | 'script';
  href: string;
  placement: (document: Document, link: HTMLLinkElement) => void;
  prefetch?: boolean;
}

function insertLink(
  element: HTMLElement | null,
  link: HTMLLinkElement,
  position: 'before' | 'after'
): void {
  if (element) {
    // insert after Quill hide content snippet styles tag
    element.parentElement?.insertBefore(
      link,
      position === 'after' ? element.nextElementSibling : element
    );
  } else {
    console.error(
      'Could not insert the link as provided element does not exist in the DOM',
      link
    );
  }
}

@Injectable({ providedIn: 'root' })
export class LazyLinkService {
  lazyLinks: Partial<Record<LazyLinks, HTMLLinkElement>> = {};

  private readonly linkFileNames: Record<LazyLinks, LazyLinkMetadata> = {
    'lazy-markdown-styles': {
      rel: 'stylesheet',
      href: lazyMarkdownStyles,
      placement: (document: Document, link: HTMLLinkElement) =>
        // Insert this custom styles right after the angular global stylesheet link.
        // It has to be precisely after the global styles and before any component styles to prevent css overriding.
        insertLink(
          document.querySelector(
            // selects link stylesheet element that is referring to `styles.*.css`
            'link[rel=stylesheet][href^=styles\\.][href$=\\.css]'
          ),
          link,
          'after'
        ),
      prefetch: true,
    },
  };

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Lazy-loads the desired file by placing a corresponding link into the head of the document
   *
   * @param name - one of the links configured for lazy loading in lazyLinks map
   */
  loadLink(name: LazyLinks): void {
    if (this.lazyLinks[name]) {
      return;
    }

    const link = (this.lazyLinks[name] = this.createLink(name));

    this.linkFileNames[name].placement(this.document, link);
  }

  /**
   * This method should be called once (preferably right after bootstrap) to register all links that need to be prefetched
   */
  registerPrefetchLinks(): void {
    Object.entries(this.linkFileNames)
      .filter(([, { prefetch }]) => prefetch)
      .forEach(([linkName]) => {
        const prefetchLink = this.createLink(linkName as LazyLinks, true);
        this.document.head.prepend(prefetchLink);
      });
  }

  private createLink(name: LazyLinks, isPrefetch?: boolean): HTMLLinkElement {
    const link = this.document.createElement('link');
    link.id = `${name}${isPrefetch ? '-prefetch' : ''}`;
    link.rel = isPrefetch ? 'prefetch' : this.linkFileNames[name].rel;
    link.href = this.linkFileNames[name].href;

    return link;
  }
}
