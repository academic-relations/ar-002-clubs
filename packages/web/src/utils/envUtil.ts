function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

export const castProcessEnvToBool = (envField: string | undefined): boolean => {
  if (envField === undefined || envField === null) return false;
  if (envField.toLowerCase() === "false") return false;
  if (envField.toLowerCase() === "true") return true;
  if (isNumeric(envField)) return parseInt(envField) !== 0;
  if (envField.replaceAll(" ", "") === "") return false;
  return !!envField;
};
