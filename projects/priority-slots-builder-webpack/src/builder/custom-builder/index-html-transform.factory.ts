import { BuilderContext } from '@angular-devkit/architect';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { indexHtmlTransformFactory as angularCustomIndexHtmlTransformFactory } from './defaults';
import { indexHtmlTransformFactory as stylesSlotsIndexHtmlTransformFactory } from '../styles-slots';
import { CustomWebpackBuilderOptions } from './model';

export const indexHtmlTransformFactory: (
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
) => IndexHtmlTransform = (options, context) => {
  const defaultTransform = angularCustomIndexHtmlTransformFactory(
    options,
    context
  );
  const stylesSlotsTransform = stylesSlotsIndexHtmlTransformFactory(
    options,
    context
  );

  return (indexHtml: string) => {
    return defaultTransform(indexHtml).then((r) => stylesSlotsTransform(r));
  };
};
