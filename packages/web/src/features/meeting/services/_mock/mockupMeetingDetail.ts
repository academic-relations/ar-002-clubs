import { MeetingDetail } from "@sparcs-clubs/web/features/meeting/types/meeting";

// TODO. mock data api에 맞게 수정
export const mockupData: MeetingDetail = {
  id: 1,
  title: "2024년 3월 제1차 정기 전체동아리대표자회의 공고",
  content: `(English Notice on the bottom)
  
  안녕하세요, 학부 동아리연합회 부회장입니다.
  
  다음과 같이 전체동아리대표자회의의 일시와 장소를 공고합니다.
  
  일시 : 2024년 3월 20일(수) 19시 30분
  장소 : 전산학부동 제1공동강의실 (E3-1 1501호) 
  
  - 출결 관련 유의사항 (본회 회칙 제17조 참고) -
  이번 회의의 재적 인원은 2023 가을학기 등록을 기준으로 합니다.
  출석은 1인 당 1개 직에 대해서만 인정하며, 동아리 대표자 본인의 출석이 불가한 경우 대의원(의결권 O) 혹은 대리인(의결권 X)도 출석이 인정됩니다.
  
  감사합니다.
  
  ---
  
  Hello, this is the vice-president of KAIST Undergraduate Students Clubs Union.
  
  The date and location of the 1st Council of the Club Representatives in 2024 is announced as follows:
  
  Date & Time : MAR 20, 2024 (Wed) 7:30pm 
  Location : E3-1 Room No.1501 (School of CS Bldg. 1F)
  
  - Precautions Related to Attendance -
  The students who is obligated to attend in this legislative is based on the registration of 2023 fall semester.
  If the club representative is unable to attend, another delegate (with voting right) or deputy (without voting right) can also be admitted.
  
  Thank you.`,
  count: 1,
  isRegular: false,
  meetingType: "분과회의",
  startDate: new Date(),
};
