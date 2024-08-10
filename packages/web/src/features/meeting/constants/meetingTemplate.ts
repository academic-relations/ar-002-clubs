import { formatDate } from "date-fns";

import { ko } from "date-fns/locale";

import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

import { getFullSemester } from "@sparcs-clubs/web/utils/getSemester";

import { MeetingTemplateInfo } from "../types/meeting";

export type TemplateType = {
  title: string;
  content: string;
};

export class MeetingTemplate {
  static getContent(data: MeetingTemplateInfo) {
    const now = new Date();

    const isRegularMeetingText = data.isRegular ? "정기회" : "임시회";

    if (
      data.meetingType === "확대운영위원회" ||
      data.meetingType === "운영위원회"
    ) {
      return `안녕하세요, 동아리연합회 부회장입니다.
        
        본회 회칙 제≈ === '확대운영위원회' ? 35 : 40}조에 따라, 제${data.count}차 ${data.meetingType} (${now.getMonth()}월, ${isRegularMeetingText})를 아래와 같이 진행합니다.
    
        일시 : ${formatDateTime(data.startDate)}
        장소 : ${data.location}
        
        감사합니다.`;
    }

    // TODO. 장소 영어로 변경?
    if (data.meetingType === "전동대회") {
      return `(English Notice on the bottom)

안녕하세요, 학부 동아리연합회 부회장입니다.

다음과 같이 전동대회 일시와 장소를 공고합니다.

일시 : ${formatDateTime(data.startDate)}
장소 : ${data.location}

- 출결 관련 유의사항 (본회 회칙 제17조 참고) -
이번 회의의 재적 인원은 ${getFullSemester(now)} 등록을 기준으로 합니다.
출석은 1인 당 1개 직에 대해서만 인정하며, 동아리 대표자 본인의 출석이 불가한 경우 대의원(의결권 O) 혹은 대리인(의결권 X)도 출석이 인정됩니다.

감사합니다.

---

Hello, this is the vice-president of KAIST Undergraduate Students Clubs Union.

The date and location of the 1st Council of the Club Representatives in 2024 is announced as follows:

Date & Time : ${formatDate(data.startDate, "%b %d, %Y (%a) %I:%M%p")}
Location : ${data.location}

- Precautions Related to Attendance -
The students who is obligated to attend in this legislative is based on the registration of ${getFullSemester(now)} semester.
If the club representative is unable to attend, another delegate (with voting right) or deputy (without voting right) can also be admitted.

Thank you.`;
    }
    return "";
  }

  static defaultTemplate(data: MeetingTemplateInfo): TemplateType {
    const now = new Date();

    return {
      title: `${now.getFullYear()}년 제${data.count}차 ${data.meetingType} (${now.getMonth()}월, ${data.isRegular ? "정기회" : "임시회"})`,
      content: this.getContent(data),
    };
  }

  static SubcommitteeMeetingTemplate(data: MeetingTemplateInfo): TemplateType {
    const now = new Date();

    return {
      title: `${now.getMonth()}월 ${data.meetingType} 기간 공고`,
      content: `안녕하세요, 부회장입니다.

        7월 분과회의 기간을 다음과 같이 공고합니다.
        ${formatDate(data.startDate, "M.dd (E)", { locale: ko })} ~ ${formatDate(data.startDate, "M.dd (E)", { locale: ko })}
        
        감사합니다.`,
    };
  }
}
