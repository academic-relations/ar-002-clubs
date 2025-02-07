export const isObjectEmpty = <T extends object>(obj?: T): boolean =>
  obj == null || Object.keys(obj).length === 0;
