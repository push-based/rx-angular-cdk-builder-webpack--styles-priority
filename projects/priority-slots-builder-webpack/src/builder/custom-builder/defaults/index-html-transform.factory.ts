import { tsNodeRegister } from '../utils';
import { getSystemPath, JsonObject, normalize } from '@angular-devkit/core';
import { BuilderContext } from '@angular-devkit/architect';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/utils/index-file/index-html-generator';

export function indexHtmlTransformFactory(
  options: JsonObject,
  context: BuilderContext
): IndexHtmlTransform {
  const { indexTransform, tsConfig } = options;
  const { workspaceRoot, target } = context;
  // if custom indexTransform is set in angular.json use them first
  if (!indexTransform) {
    return (indexHtml: string): Promise<string> => Promise.resolve(indexHtml);
  }
  tsNodeRegister(
    indexTransform as string,
    `${getSystemPath(normalize(workspaceRoot))}/${tsConfig}`
  );
  const indexModule = require(`${getSystemPath(
    normalize(workspaceRoot)
  )}/${indexTransform}`);
  const transform = indexModule.default || indexModule;

  return (indexHtml: string) => transform(target, indexHtml);
}
