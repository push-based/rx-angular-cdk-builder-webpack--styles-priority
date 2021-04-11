import { TypedObject } from '../custom-builder/model';
import { RxaStyle } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';

export function webpackConfigurationTransform(
  rxaStyles: RxaStyle
): ExecutionTransformer<Configuration> {
  return (webpackConfig: Configuration): Promise<Configuration> => {
    const { entry } = webpackConfig as any;
    const { notInjected, ...slots } = rxaStyles;

    const notInjectedEntries = Object.values(notInjected || {})
      .map(({ input, bundleName }) => ({ [bundleName]: input }))
      .reduce((newEntries, entries) => ({ ...newEntries, ...entries }));

    const slotEntries = (TypedObject).entries(slots).reduce(
      (acc, [slotName, eagerStyleObjects]) => ({
        ...acc,
        [slotName]: eagerStyleObjects.reduce(
          (arr, eagerStyleObject) =>
            arr.concat(
              Array.isArray(eagerStyleObject.input)
                ? eagerStyleObject.input
                : [eagerStyleObject.input]
            ),
          []
        ),
      }),
      {}
    );

    webpackConfig = {
      ...webpackConfig,
      entry: {
        ...entry,
        ...notInjectedEntries,
        ...slotEntries,
      },
    };

    return Promise.resolve(webpackConfig);
  };
}
