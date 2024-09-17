import { formatDateTime } from "../utils/Date/formatDate";

const newMemberListSectionInfoText = (semester: string, deadline: Date) =>
  `현재는 ${semester}학기 동아리 신청 기간입니다 (신청 마감 : ${formatDateTime(deadline)})`;

export { newMemberListSectionInfoText };
