export const takeUnique = <T>(values: T[]): T => values[0];
export const isEmptyObject = obj =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export function getKSTDate(input?: string | Date): Date {
  let date: Date;

  if (input === undefined || typeof input === "string") {
    date = input ? new Date(input) : new Date();

    // 현재 로컬 시간대의 오프셋을 구합니다 (분 단위).
    const timezoneOffset = date.getTimezoneOffset() * 60000; // 분을 밀리초로 변환

    // 오프셋을 적용하여 시간을 보정
    date.setTime(date.getTime() - timezoneOffset);
    return date;
  }
  return new Date(input);
}
