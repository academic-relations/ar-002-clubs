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

const InfoText = () =>
  `상자의 규격은 가로 37cm, 세로 55cm, 높이 31cm 이하입니다.`;

export { InfoText, storageOrderSteps };
