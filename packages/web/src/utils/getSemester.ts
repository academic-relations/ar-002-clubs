// month 동적처리 가능하면 수정하기
export const getSemester = (month: number) => {
  if ([3, 4, 5, 6].includes(month)) {
    return { ko: "봄학기", en: "spring" };
  }
  if ([7, 8].includes(month)) {
    return { ko: "여름학기", en: "summer" };
  }
  if ([9, 10, 11, 12].includes(month)) {
    return { ko: "가을학기", en: "fall" };
  }
  if ([1, 2].includes(month)) {
    return { ko: "겨울학기", en: "winter" };
  }
  return undefined;
};

export const getFullSemester = (date?: Date, inEnglish: boolean = false) => {
  const targetDate = date ?? new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;

  return `${year} ${inEnglish ? (getSemester(month)?.en ?? "") : (getSemester(month)?.ko ?? "")}`;
};
