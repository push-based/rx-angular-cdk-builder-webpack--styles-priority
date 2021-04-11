import { rxaStylesObjectToExtraEntryPoints } from '../custom-builder/utils';
import { EagerStylesObject, styleSlots } from './model';
import { CustomWebpackBuilderOptions } from '../custom-builder';

export function mergeRxaStylesIntoAngularStyles(
  options: CustomWebpackBuilderOptions
): CustomWebpackBuilderOptions {
  const { rxaStyles, ...otherOptions } = options;
  const { notInjected, ...slots } = rxaStyles;
  const notInjectedEntries = Object.values(notInjected || {})
    .map((lazyStyleObject) =>
      rxaStylesObjectToExtraEntryPoints(
        lazyStyleObject,
        lazyStyleObject.bundleName
      )
    )
    .reduce((newEntries, entries) => newEntries.concat(entries), []);
  const slotEntries = Object.entries(slots || {}).reduce(
    (acc, [slotName, eagerStyleObjects]: [string, EagerStylesObject[]]) =>
      acc.concat(
        eagerStyleObjects.reduce(
          (l, eagerStyleObject) =>
            l.concat(
              rxaStylesObjectToExtraEntryPoints(
                eagerStyleObject,
                slotName as styleSlots
              )
            ),
          []
        )
      ),
    []
  );
  options.styles = Array.from(new Set([
    ...(otherOptions.styles as any),
    ...notInjectedEntries,
    ...slotEntries,
  ]));
  return options as CustomWebpackBuilderOptions;
}
