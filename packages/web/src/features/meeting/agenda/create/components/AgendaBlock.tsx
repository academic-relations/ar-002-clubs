// TODO: 구현하기 -> Array<AgendaContent> 사용
import React, { useState } from "react";

import FoldUnfoldButton from "@sparcs-clubs/web/common/components/Buttons/FoldUnfoldButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";
import {
  AgendaTypeEnum,
  AgendaTypeName,
} from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";
import AgendaEditor from "@sparcs-clubs/web/features/meeting/agenda/create/components/AgendaEditor";
import AgendaViewer from "@sparcs-clubs/web/features/meeting/agenda/create/components/AgendaViewer";

const AgendaBlock: React.FC = () => {
  const [folded, setFolded] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [index, setIndex] = useState(0);

  const [mockNewAgendaList, setMockNewAgendaList] = useState([
    {
      type: AgendaTypeEnum.Report,
      title: "술박스 개수 점검",
      content: "술박스가 5조 5억개 있습니다.",
    },
    {
      type: AgendaTypeEnum.Approval,
      title: "술박스 구입 허락",
      content: "술박스 구입이 허락되었습니다.",
    },
  ]);

  const currentNewAgendaTypeName =
    AgendaTypeName[mockNewAgendaList[index].type];

  const increaseIndex = () => {
    if (index === mockNewAgendaList.length - 1) setIndex(0);
    else setIndex(index + 1);

    setEditMode(false);
  };

  const decreaseIndex = () => {
    if (index === 0) setIndex(mockNewAgendaList.length - 1);
    else setIndex(index - 1);

    setEditMode(false);
  };

  const deleteAgenda = () => {
    mockNewAgendaList.splice(index, 1);
    setMockNewAgendaList([...mockNewAgendaList]);
    setEditMode(false);

    if (index === mockNewAgendaList.length) {
      setIndex(index - 1);
    }
  };

  return (
    <FlexWrapper gap={8} direction="column">
      <FlexWrapper gap={8} direction="row" style={{ alignItems: "center" }}>
        <FlexWrapper gap={0} direction="column">
          <Icon type="arrow_drop_up" size={24} onClick={increaseIndex} />
          <Icon type="arrow_drop_down" size={24} onClick={decreaseIndex} />
        </FlexWrapper>
        <Typography
          fs={20}
          lh={24}
          fw="MEDIUM"
          style={{ flex: 1, marginLeft: 4 }}
        >
          {mockNewAgendaList.length > 0
            ? `${currentNewAgendaTypeName}${index + 1}`
            : "안건 없음"}
        </Typography>
        <FoldUnfoldButton folded={folded} setFolded={setFolded} />
      </FlexWrapper>
      {!folded &&
        mockNewAgendaList.length > 0 &&
        (isEditMode ? (
          <AgendaEditor
            agendaContent={mockNewAgendaList[index]}
            onDelete={deleteAgenda}
            onSave={() => setEditMode(false)}
            onChange={(agendaContent: AgendaContent) => {
              mockNewAgendaList[index] = agendaContent;
              setMockNewAgendaList([...mockNewAgendaList]);
            }}
          />
        ) : (
          <AgendaViewer
            agendaContent={mockNewAgendaList[index]}
            onDelete={deleteAgenda}
            onEdit={() => setEditMode(true)}
          />
        ))}
    </FlexWrapper>
  );
};

export default AgendaBlock;
