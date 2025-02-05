import React from "react";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Markdown from "@sparcs-clubs/web/common/components/Markdown";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";

interface AgendaViewerProps {
  agendaContent: AgendaContent;
  onDelete: () => void;
  onEdit: () => void;
}

const AgendaViewer: React.FC<AgendaViewerProps> = ({
  agendaContent,
  onDelete,
  onEdit,
}: AgendaViewerProps) => (
  <Card outline gap={20} style={{ marginLeft: 32 }}>
    <FlexWrapper gap={10} direction="row">
      <Typography fs={16} lh={20} fw="BOLD">
        안건 제목
      </Typography>
      <Typography fs={16} lh={20} fw="MEDIUM">
        {agendaContent.title}
      </Typography>
    </FlexWrapper>
    <FlexWrapper gap={10} direction="column">
      <Typography fs={16} lh={20} fw="BOLD">
        안건 내용
      </Typography>
      <Markdown initialValue={agendaContent.content} isViewer />
    </FlexWrapper>
    <FlexWrapper gap={10} direction="row" style={{ marginLeft: "auto" }}>
      <Button onClick={onDelete}>삭제</Button>
      <Button onClick={onEdit}>수정</Button>
    </FlexWrapper>
  </Card>
);

export default AgendaViewer;
