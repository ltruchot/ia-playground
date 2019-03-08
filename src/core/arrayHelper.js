import { negate } from './functionalHelper';
export const flat = arr => arr.reduce((acc, val) => acc.concat(val), []);
export const isTruthy = arr => !arr.some(negate);
