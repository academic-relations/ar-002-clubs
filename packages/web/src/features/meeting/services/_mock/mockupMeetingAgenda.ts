import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";
import { AgendaTypeEnum } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";

export const mockUpMeetingAgenda: AgendaContent[] = [
  {
    type: AgendaTypeEnum.Report,
    title: "보고하기",
    content:
      '<p>이것은 보고 안건입니다<strong class="bold-text">. 하하하하</strong></p><table class="table" style="min-width: 50px"><colgroup><col><col></colgroup><tbody><tr><td colspan="1" rowspan="1"><p>1</p></td><td colspan="1" rowspan="1"><p>1</p></td></tr><tr><td colspan="1" rowspan="1"><p>1</p></td><td colspan="1" rowspan="1"><p>1</p></td></tr></tbody></table><p></p>',
  },
  {
    type: AgendaTypeEnum.Approval,
    title: "yuwol",
    content: "이것은 인준 안건입니다.",
  },
  {
    type: AgendaTypeEnum.Deliberation,
    title: "심의하기",
    content: "이것은 심의 안건입니다.",
  },
  {
    type: AgendaTypeEnum.Discuss,
    title: "논의하기",
    content: "이것은 논의 안건입니다.",
  },
  {
    type: AgendaTypeEnum.Special,
    title: "난 특별해",
    content: "이것은 특별 안건입니다.",
  },
  {
    type: AgendaTypeEnum.Report,
    title: "보고 또 하기",
    content: "이것은 2번째 보고 안건입니다.",
  },
  {
    type: AgendaTypeEnum.Report,
    title: "보고 또또 하기",
    content: "이것은 3번째 보고 안건입니다.",
  },
  {
    type: AgendaTypeEnum.Approval,
    title: "인준2",
    content: "이것은 2번째 인준 안건입니다.",
  },
];
