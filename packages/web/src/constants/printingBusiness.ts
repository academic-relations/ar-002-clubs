import type { StepInputType } from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";

const printingBusinessOrderSteps: StepInputType[] = [
  {
    label: "기본 정보 입력",
    stepIndex: 1,
  },
  {
    label: "인쇄 정보 입력",
    stepIndex: 2,
  },
  {
    label: "최종확인",
    stepIndex: 3,
  },
];

const leftoverPrintsInfoText = (
  clubName: string,
  a3PrintRemain: number,
  a4PrintRemain: number,
) => `이번 반기에 ${clubName}에서 신청할 수 있는 홍보물 인쇄 최대 매수는 A3용지 ${a3PrintRemain}매, A4용지 ${a4PrintRemain}매입니다.\n
(동아리별로 반기당 A3용지 최대 50매, A4 용지 최대 50매 인쇄 가능)`;

// 집행부원의 상근시간(= 인쇄물 수령가능시간)은 21로 일단 고정해 두었습니다.
const executiveWorkingHourStart = 21;

export {
  executiveWorkingHourStart,
  leftoverPrintsInfoText,
  printingBusinessOrderSteps,
};
