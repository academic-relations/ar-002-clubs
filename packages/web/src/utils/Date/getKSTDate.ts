export function getKSTDate(date: Date): Date {
  const kstOffset = 9 * 60; // KST: UTC+9
  const utcDate = new Date(
    new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60 * 1000,
  );
  return new Date(utcDate.getTime() + kstOffset * 60 * 1000);
}
