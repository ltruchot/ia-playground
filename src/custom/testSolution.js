import * as arrayHelper from './../core/arrayHelper';
import { pipe } from './../core/functionalHelper';
export const checkResolvedRiddle = pipe(
  arrayHelper.flat,
  arrayHelper.isTruthy
);
