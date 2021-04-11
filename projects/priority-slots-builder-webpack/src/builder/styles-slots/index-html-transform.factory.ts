import { BuilderContext } from '@angular-devkit/architect';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { IndexHtmlTransformOption, RxaStyle } from './model';
import { indexHtmlTransform } from './index-html-transform';
import { defer, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { readDir } from '../custom-builder/utils';

export function indexHtmlTransformFactory(
  options: IndexHtmlTransformOption,
  context: BuilderContext
): IndexHtmlTransform {
  const { rxaStyles, extractCss } = options;
  const { target: targetOptions } = context;
  const usedSlots = Object.keys(rxaStyles);

  const filterFilesFactory = (file: string) => (slot: string) =>
    file.match(`(${slot}?[^\\s]+\\.${extractCss ? 'css' : 'js'})`);

  const enrichedTargetOptions$: Observable<IndexHtmlTransformOption> = defer(
    () =>
      from(context.getTargetOptions(targetOptions) as Promise<{ outputPath: string; }>)
  ).pipe(
    map(
      ({ outputPath }): IndexHtmlTransformOption => {
        return {
          ...options,
          rxaStyles: getRxaStyles(outputPath, usedSlots, filterFilesFactory),
        } as IndexHtmlTransformOption;
      }
    )
  );
  return (indexHtml: string) => {
    return indexHtmlTransform(enrichedTargetOptions$, indexHtml);
  };
}

function getRxaStyles(
  outputPath: string,
  usedSlots: string[],
  filterFilesFactory: (file: string) => (slot: string) => RegExpMatchArray
) {

  return readDir(outputPath)
    .filter((file) => {
      return usedSlots.some(filterFilesFactory(file))
    })
    .reduce((slots: RxaStyle, file: string): RxaStyle => {
      //
      slots[file.split('.').shift()] = file;
      return slots;
    }, {} as RxaStyle);
}
