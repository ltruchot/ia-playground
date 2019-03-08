export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
export const negate = a => !a;
