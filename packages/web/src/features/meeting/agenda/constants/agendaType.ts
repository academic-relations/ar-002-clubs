export enum AgendaTypeEnum {
  Report = 1, // 보고안건
  Discuss, // 논의안건
  Deliberation, // 심의안건
  Approval, // 인준안건
  Special, // 특별안건
}

export const AgendaTypeName = {
  [AgendaTypeEnum.Report]: "보고안건",
  [AgendaTypeEnum.Discuss]: "논의안건",
  [AgendaTypeEnum.Deliberation]: "심의안건",
  [AgendaTypeEnum.Approval]: "인준안건",
  [AgendaTypeEnum.Special]: "특별안건",
};
