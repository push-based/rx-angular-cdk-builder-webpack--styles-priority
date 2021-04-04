import { JsonObject } from '@angular-devkit/core';
import { BuilderContext } from '@angular-devkit/architect';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';
import { IndexHtmlTransformOption, OptionsStyleSlots } from './model';
import { indexHtmlTransform } from './index-html-transform';

export function indexHtmlTransformFactory(
  { stylesSlots }: IndexHtmlTransformOption,
  { target: targetOptions }: BuilderContext
): IndexHtmlTransform {
  const enrichedTargetOptions = { ...targetOptions, stylesSlots } as unknown as IndexHtmlTransformOption;
  return (indexHtml: string) =>
    indexHtmlTransform(enrichedTargetOptions, indexHtml);
}

