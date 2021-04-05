import { BuilderContext } from '@angular-devkit/architect';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { IndexHtmlTransformOption, StyleSlots } from './model';
import { indexHtmlTransform } from './index-html-transform';
import { defer, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { readDir } from '../custom-builder/utils';

export function indexHtmlTransformFactory(
  options: IndexHtmlTransformOption,
  context: BuilderContext
): IndexHtmlTransform {
  const { stylesSlots, extractCss } = options;
  const { target: targetOptions } = context;
  const usedSlots = Object.keys(stylesSlots);
  console.log('extractCss', options.extractCss);
  const filterFiles = (file: string) => (slot: string) =>
    file.match(`(${slot}?[^\\s]+\\.${extractCss ? 'css' : 'js'})`);

  const enrichedTargetOptions$: Observable<IndexHtmlTransformOption> = defer(
    () =>
      from(
        context.getTargetOptions(targetOptions) as Promise<{
          outputPath: string;
        }>
      )
  ).pipe(
    map(
      ({ outputPath }): IndexHtmlTransformOption => {
        console.log(
          'new slots: ',
          getStylesSlots(outputPath, usedSlots, filterFiles)
        );
        return {
          ...options,
          stylesSlots: getStylesSlots(outputPath, usedSlots, filterFiles),
        } as IndexHtmlTransformOption;
      }
    )
  );
  return (indexHtml: string) => {
    return indexHtmlTransform(enrichedTargetOptions$, indexHtml);
  };
}

function getStylesSlots(
  outputPath: string,
  usedSlots: string[],
  filterFiles: (file: string) => (slot: string) => RegExpMatchArray
) {
  return readDir(outputPath)
    .filter((file) => usedSlots.some(filterFiles))
    .reduce((slots: StyleSlots, file: string): StyleSlots => {
      slots[file.split('.').shift()] = file;
      return slots;
    }, {} as StyleSlots);
}
