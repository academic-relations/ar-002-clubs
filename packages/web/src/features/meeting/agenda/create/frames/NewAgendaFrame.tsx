// TODO: figma 맞춰서

import React, { useEffect, useRef, useState } from "react";

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

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, mockNewAgendaList.length);
    mockNewAgendaList.forEach((_, index) => {
      if (!refs.current[index]) refs.current[index] = null;
    });
  }, [mockNewAgendaList]);

  const updateAgendaOrder = (index1: number, index2: number) => {
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

    refs.current[index2]?.scrollIntoView({
      behavior: "instant",
      block: "center",
    });
  };

  const deleteAgenda = (index: number) => {
    mockNewAgendaList.splice(index, 1);
    setMockNewAgendaList([...mockNewAgendaList]);
  };

  const updateAgenda = (index: number, newContent: AgendaContent) => {
    mockNewAgendaList[index] = newContent;
    setMockNewAgendaList([...mockNewAgendaList]);
  };

  return (
    mockNewAgendaList.length > 0 &&
    mockNewAgendaList.map((agenda, index) => {
      typeCounter[agenda.type] += 1;
      return (
        <AgendaBlock
          ref={el => {
            refs.current[index] = el;
          }}
          key={agenda.title}
          index={index}
          agenda={agenda}
          goUp={() => {
            updateAgendaOrder(index, index - 1);
          }}
          goDown={() => {
            updateAgendaOrder(index, index + 1);
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
