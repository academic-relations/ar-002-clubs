// TODO: 구현하기 -> Array<AgendaContent> 사용
import React, { useState } from "react";

import FoldUnfoldButton from "@sparcs-clubs/web/common/components/Buttons/FoldUnfoldButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";
import { AgendaTypeName } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";
import AgendaEditor from "@sparcs-clubs/web/features/meeting/agenda/create/components/_atomic/AgendaEditor";
import AgendaViewer from "@sparcs-clubs/web/features/meeting/agenda/create/components/_atomic/AgendaViewer";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface AgendaBlockProps {
  agendaContent: AgendaContent;
  setAgendaContent: (value: AgendaContent) => void;
  isFirst: boolean;
  isLast: boolean;
  decreaseIndex: () => void;
  increaseIndex: () => void;
  onDelete: () => void;
  indexAmongSameType: number;
}

const AgendaBlock: React.FC<AgendaBlockProps> = ({
  agendaContent,
  setAgendaContent,
  isFirst,
  isLast,
  decreaseIndex,
  increaseIndex,
  onDelete,
  indexAmongSameType,
}: AgendaBlockProps) => {
  const [folded, setFolded] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const currentNewAgendaTypeName = AgendaTypeName[agendaContent.type];

  return (
    <FlexWrapper gap={8} direction="column">
      <FlexWrapper gap={8} direction="row" style={{ alignItems: "center" }}>
        <FlexWrapper gap={0} direction="column">
          <Icon
            type="arrow_drop_up"
            size={24}
            color={isFirst ? colors.GRAY[300] : colors.BLACK}
            onClick={isFirst ? undefined : decreaseIndex}
          />
          <Icon
            type="arrow_drop_down"
            size={24}
            color={isLast ? colors.GRAY[300] : colors.BLACK}
            onClick={isLast ? undefined : increaseIndex}
          />
        </FlexWrapper>
        <Typography
          fs={20}
          lh={24}
          fw="MEDIUM"
          style={{ flex: 1, marginLeft: 4 }}
        >
          {`${currentNewAgendaTypeName}${indexAmongSameType}: ${agendaContent.title ?? "제목 없음"}`}
        </Typography>
        <FoldUnfoldButton folded={folded} setFolded={setFolded} />
      </FlexWrapper>
      {!folded &&
        (isEditMode ? (
          <AgendaEditor
            agendaContent={agendaContent}
            onDelete={onDelete}
            onSave={() => setEditMode(false)}
            onChange={setAgendaContent}
          />
        ) : (
          <AgendaViewer
            agendaContent={agendaContent}
            onDelete={onDelete}
            onEdit={() => setEditMode(true)}
          />
        ))}
    </FlexWrapper>
  );
};

export default AgendaBlock;
