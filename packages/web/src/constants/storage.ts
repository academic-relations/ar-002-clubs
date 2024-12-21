import type { StepInputType } from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";

const storageOrderSteps: StepInputType[] = [
  {
    label: "기본 정보 입력",
    stepIndex: 1,
  },
  {
    label: "신청서 작성",
    stepIndex: 2,
  },
  {
    label: "최종 확인",
    stepIndex: 3,
  },
];

const maxNonStandardItems: number = 5;

export { storageOrderSteps, maxNonStandardItems };
