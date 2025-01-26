// 시간을 제외한 날짜만 KST로 변경
// 예시: 입력 date가 2024-10-18 15:00 일 경우 getKSTDate 씌워서 api 요청 보내면
// 2024.10.18 00:00 으로 요청 보내짐 (백에서도 그대로 받아서 그대로 프론트에 데이터 보냄)
// 즉 항상 시간은 00:00 이게 됨
export function getKSTDate(date: Date): Date {
  const localDateOnly = new Date(
    new Date(date).getFullYear(),
    new Date(date).getMonth(),
    new Date(date).getDate(),
  );

  const kstOffset = 9 * 60; // KST: UTC+9
  return new Date(localDateOnly.getTime() + kstOffset * 60 * 1000);
}

// 시간 포함하여 KST 변경
export function getKSTDateTime(date: Date): Date {
  const kstOffset = 9 * 60; // KST: UTC+9

  return new Date(new Date(date).getTime() + kstOffset * 60 * 1000);
}
