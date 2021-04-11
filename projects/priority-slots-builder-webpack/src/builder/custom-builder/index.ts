export {CustomWebpackBuilderOptions, WebpackBuilderSchema, WebpackEntry, WebpackEntryConfig} from './model';
export {getTransforms} from './transforms';

export function setupStylesBundles(
  cfg: any,
  variant: any
): any {
  const {
    polyfills,
    ['polyfills-es5']: polyfillsEs5,
    scripts,
    styles,
    main,
    runtime,
    vendor,
    ...other
  }: { [key: string]: string[] } = cfg.entry as { [key: string]: string[] };

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

  return {
    ...cfg,
    entry: {
      main: []
        .concat(polyfills || [])
        .concat(scripts || [])
        // Never include styles
        // .concat(styles ? styles || [] : [])
        .concat(runtime || [])
        .concat(vendor || [])
        .concat(main || [])
    }
  };
}
