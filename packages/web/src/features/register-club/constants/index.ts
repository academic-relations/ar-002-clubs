import { Semester } from "@sparcs-clubs/web/types/semester";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

import { RegistrationType } from "../types/registerClub";

export const registerClubDeadlineInfoText = (
  date: Date,
  targetSemester?: Semester,
) =>
  `현재는 ${targetSemester?.year}년 ${targetSemester?.name}학기 동아리 등록 기간입니다 (신청 마감 : ${formatDateTime(date)})`;

export const registerClubOptions = [
  {
    type: RegistrationType.Renewal,
    title: "재등록",
    buttonText: ["직전 학기에 정동아리 지위를 유지했던 동아리만 등록 가능"],
  },
  {
    type: RegistrationType.Promotional,
    title: "신규 등록",
    buttonText: [
      "2개 정규학기 이상 가등록 지위를 유지한 동아리 등록 가능",
      "등록 취소 이후 3개 정규학기 이상 지나지 않은 단체 등록 가능",
    ],
  },
  {
    type: RegistrationType.Provisional,
    title: "가등록",
    buttonText: [
      "새로 동아리를 만드려는 학부 총학생회 정회원 등록 가능",
      "직전 학기에 가등록 지위를 유지한 동아리 등록 가능",
    ],
  },
];
