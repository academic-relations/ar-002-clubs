import { getDate, getHours, getMinutes, getMonth, getYear } from "date-fns";

const manageClubFundingPageBreadCrumbName = "지원금";
const manageClubFundingPageName = "지원금";
const manageClubFundingPagePath = "/manage-club/funding";

const newFundingListSectionTitle = "신규 지원금 신청";
const newFundingListSectionInfoText = (semester: string, deadline: Date) =>
  `현재는 ${semester}학기 지원금 신청 기간입니다 (신청 마감 : ${getYear(deadline)}년 ${getMonth(deadline)}월 ${getDate(deadline)}일 ${getHours(deadline)}:${getMinutes(deadline)})`;
const newFundingOrderButtonText = "지원금 신청 내역 추가";

const tableRowCountText = (count: number) => `총 ${count}개`;
// 임의로 부여한 이름이라 동연 번역에 맞춰야 할듯 합니다
const tableHeaderText = {
  status: "상태",
  activityName: "활동명",
  contentName: "항목명",
  expenditureAmount: "신청 금액",
  approvedAmount: "승인 금액",
};
const numberToKrWon = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

const pastFundingListSectionTitle = "과거 지원금 내역";
const singleSemesterFundingListSectionTitleText = (
  semester: string,
  itemCount: number,
) => `${semester} (총 ${itemCount}개)`;

export {
  manageClubFundingPageBreadCrumbName,
  manageClubFundingPageName,
  manageClubFundingPagePath,
  newFundingListSectionInfoText,
  newFundingListSectionTitle,
  newFundingOrderButtonText,
  numberToKrWon,
  pastFundingListSectionTitle,
  singleSemesterFundingListSectionTitleText,
  tableHeaderText,
  tableRowCountText,
};
