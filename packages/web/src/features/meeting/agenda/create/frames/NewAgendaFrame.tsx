// TODO: figma 맞춰서

import React, { useState } from "react";

import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";

import { AgendaTypeEnum } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";
import AgendaBlock from "@sparcs-clubs/web/features/meeting/agenda/create/components/AgendaBlock";
import { mockUpMeetingAgenda } from "@sparcs-clubs/web/features/meeting/services/_mock/mockupMeetingAgenda";

const NewAgendaFrame: React.FC = () => {
  const [mockNewAgendaList, setMockNewAgendaList] =
    useState(mockUpMeetingAgenda);

  const typeCounter: Record<AgendaTypeEnum, number> = {
    // 인준안건1 이런 식으로 각 종류별로 숫자를 관리하기 위함
    [AgendaTypeEnum.Report]: 0,
    [AgendaTypeEnum.Approval]: 0,
    [AgendaTypeEnum.Deliberation]: 0,
    [AgendaTypeEnum.Discuss]: 0,
    [AgendaTypeEnum.Special]: 0,
  };

  const refs = mockNewAgendaList.map(() => React.createRef<HTMLDivElement>());

  const groupedAgendas: Record<AgendaTypeEnum, AgendaContent[]> = {} as Record<
    AgendaTypeEnum,
    AgendaContent[]
  >; // 종류별로 숫자를 매기기 위함

  const updateAgendaOrder = (
    index1: number,
    index2: number,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    if (index1 < 0 || index2 < 0) return;
    if (
      index1 >= mockNewAgendaList.length ||
      index2 >= mockNewAgendaList.length
    )
      return;

    const temp = mockNewAgendaList[index1];
    mockNewAgendaList[index1] = mockNewAgendaList[index2];
    mockNewAgendaList[index2] = temp;
    setMockNewAgendaList([...mockNewAgendaList]);

    ref.current?.scrollIntoView({ behavior: "instant", block: "center" });
  };

  const deleteAgenda = (index: number) => {
    mockNewAgendaList.splice(index, 1);
    setMockNewAgendaList([...mockNewAgendaList]);
  };

  const updateAgenda = (index: number, newContent: AgendaContent) => {
    mockNewAgendaList[index] = newContent;
    setMockNewAgendaList([...mockNewAgendaList]);
  };

  mockNewAgendaList.forEach(agenda => {
    groupedAgendas[agenda.type] = groupedAgendas[agenda.type] || [];
    groupedAgendas[agenda.type].push(agenda);
  });

  return (
    mockNewAgendaList.length > 0 &&
    mockNewAgendaList.map((agenda, index) => {
      typeCounter[agenda.type] += 1;
      return (
        <AgendaBlock
          ref={refs[index]}
          key={agenda.title}
          index={index}
          agenda={agenda}
          goUp={() => {
            updateAgendaOrder(index, index - 1, refs[index - 1]);
          }}
          goDown={() => {
            updateAgendaOrder(index, index + 1, refs[index + 1]);
          }}
          deleteAgenda={() => {
            deleteAgenda(index);
          }}
          editAgenda={newContent => {
            updateAgenda(index, newContent);
          }}
          lastIndex={mockNewAgendaList.length - 1}
          typeIndex={typeCounter[agenda.type]}
        />
      );
    })
  );
};

export default NewAgendaFrame;
