export const getActualYear = (date: Date | string) =>
  new Date(date).getFullYear();

export const getActualMonth = (date: Date | string) =>
  new Date(date).getMonth() + 1;
