// TODO: 구현하기 -> Array<AgendaContent> 사용
import React, { forwardRef, useState } from "react";

import FoldUnfoldButton from "@sparcs-clubs/web/common/components/Buttons/FoldUnfoldButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";
import { AgendaTypeName } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";
import AgendaEditor from "@sparcs-clubs/web/features/meeting/agenda/create/components/AgendaEditor";
import AgendaViewer from "@sparcs-clubs/web/features/meeting/agenda/create/components/AgendaViewer";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface AgendaBlockProps {
  key: string;
  index: number;
  agenda: AgendaContent;
  goUp: () => void;
  goDown: () => void;
  deleteAgenda: () => void;
  editAgenda: (newContent: AgendaContent) => void;
  lastIndex: number;
  typeIndex: number;
}

const AgendaBlock = forwardRef<HTMLDivElement, AgendaBlockProps>(
  (
    {
      key,
      index,
      agenda,
      goUp,
      goDown,
      deleteAgenda,
      editAgenda,
      lastIndex,
      typeIndex,
    },
    ref,
  ) => {
    const [folded, setFolded] = useState(key ? false : !true);
    const [isEditMode, setEditMode] = useState(false);

    const currentNewAgendaTypeName = AgendaTypeName[agenda.type];

    const goUpWrapper = () => {
      if (index <= 0 || isEditMode) return;
      setEditMode(false);
      goUp();
    };

    const closeAndGoDown = () => {
      if (index >= lastIndex || isEditMode) return;
      setEditMode(false);
      goDown();
    };

    return (
      <div ref={ref}>
        <FlexWrapper gap={8} direction="column">
          <FlexWrapper gap={8} direction="row" style={{ alignItems: "center" }}>
            <FlexWrapper gap={0} direction="column">
              <Icon
                type="arrow_drop_up"
                size={24}
                onClick={goUpWrapper}
                color={
                  !isEditMode && index > 0 ? colors.BLACK : colors.GRAY[300]
                }
              />
              <Icon
                type="arrow_drop_down"
                size={24}
                onClick={closeAndGoDown}
                color={
                  !isEditMode && index < lastIndex
                    ? colors.BLACK
                    : colors.GRAY[300]
                }
              />
            </FlexWrapper>
            <Typography
              fs={20}
              lh={24}
              fw="MEDIUM"
              style={{ flex: 1, marginLeft: 4 }}
            >
              {`${currentNewAgendaTypeName}${typeIndex}`}
            </Typography>
            <FoldUnfoldButton
              folded={folded}
              setFolded={() => {
                if (!isEditMode) setFolded(!folded);
              }}
              disabled={isEditMode}
            />
          </FlexWrapper>
          {!folded &&
            (isEditMode ? (
              <AgendaEditor
                agendaContent={agenda}
                onCancel={() => {
                  setEditMode(false);
                }}
                onSave={(agendaContent: AgendaContent) => {
                  editAgenda(agendaContent);
                  setEditMode(false);
                }}
              />
            ) : (
              <AgendaViewer
                agendaContent={agenda}
                onDelete={deleteAgenda}
                onEdit={() => setEditMode(true)}
              />
            ))}
        </FlexWrapper>
      </div>
    );
  },
);
AgendaBlock.displayName = "AgendaBlock";
export default AgendaBlock;
