export const takeUnique = <T>(values: T[]): T => values[0];
export const isEmptyObject = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;
