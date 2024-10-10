"use client";

import React, { useState } from "react";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";
import { AgendaTypeEnum } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";
import EditAgendaFrame from "@sparcs-clubs/web/features/meeting/agenda/create/frames/EditAgendaFrame";
import ViewAgendaFrame from "@sparcs-clubs/web/features/meeting/agenda/create/frames/ViewAgendaFrame";

const AgendaCreate: React.FC = () => {
  const [mockNewAgendaList, setMockNewAgendaList] = useState<AgendaContent[]>([
    {
      type: AgendaTypeEnum.Report,
      title: "술박스 개수 점검",
      content: "술박스가 5조 5억개 있습니다.",
    },
    {
      type: AgendaTypeEnum.Discuss,
      title: "술박스 구입 개수 논의",
      content: "술박스를 10개 구입하기로 결정했습니다.",
    },
    {
      type: AgendaTypeEnum.Approval,
      title: "술박스 구입 허락",
      content: "술박스 구입이 허락되었습니다.",
    },
  ]);

  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <FlexWrapper gap={60} direction="column">
      <PageHead
        items={[
          { name: "의결기구", path: "/meeting" },
          { name: "분과회의", path: "/meeting/agenda" },
        ]}
        title="안건지 작성하기"
        enableLast
      />
      <FlexWrapper gap={12} direction="row">
        <Button
          type={isEditMode ? "outlined" : "default"}
          style={{ flex: 1 }}
          onClick={() => setIsEditMode(false)}
        >
          보기 모드
        </Button>
        <Button
          type={isEditMode ? "default" : "outlined"}
          style={{ flex: 1 }}
          onClick={() => setIsEditMode(true)}
        >
          수정 모드
        </Button>
      </FlexWrapper>
      {isEditMode ? (
        <EditAgendaFrame
          agendaList={mockNewAgendaList}
          setAgendaList={setMockNewAgendaList}
        />
      ) : (
        <ViewAgendaFrame />
      )}
    </FlexWrapper>
  );
};

export default AgendaCreate;
