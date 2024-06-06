import { getDate, getHours, getMinutes, getMonth, getYear } from "date-fns";

const newMemberListSectionInfoText = (semester: string, deadline: Date) =>
  `현재는 ${semester}학기 동아리 신청 기간입니다 
(신청 마감 : ${getYear(deadline)}년 ${getMonth(deadline)}월 ${getDate(deadline)}일 
${getHours(deadline)}:${getMinutes(deadline)})`;

export { newMemberListSectionInfoText };
