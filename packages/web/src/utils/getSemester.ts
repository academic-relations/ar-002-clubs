// month 동적처리 가능하면 수정하기
export const getSemester = (month: number) => {
  if (month in [3, 4, 5, 6]) {
    return { ko: "봄학기", en: "spring" };
  }
  if (month in [7, 8]) {
    return { ko: "여름학기", en: "summer" };
  }
  if (month in [9, 10, 11, 12]) {
    return { ko: "가을학기", en: "fall" };
  }
  if (month in [1, 2]) {
    return { ko: "겨울학기", en: "winter" };
  }
  return undefined;
};

export const getFullSemester = (date?: Date, inEnglish: boolean = false) => {
  const targetDate = date ?? new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();

  return `${year} ${inEnglish ? getSemester(month)?.en ?? "" : getSemester(month)?.ko ?? ""}`;
};
