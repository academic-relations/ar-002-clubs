import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";

interface AgendaViewerProps {
  agendaContent: AgendaContent;
  onDelete: () => void;
  onEdit: () => void;
}

// TODO: Impl TextArea
const TextArea = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
  padding: 32px;
`;

const AgendaViewer: React.FC<AgendaViewerProps> = ({
  agendaContent,
  onDelete,
  onEdit,
}: AgendaViewerProps) => (
  <Card outline gap={32} style={{ marginLeft: 32 }}>
    <TextArea>
      {
        `제목: ${agendaContent.title} / 내용: ${agendaContent.content}` /* TODO: set appropriate text */
      }
    </TextArea>
    <FlexWrapper gap={10} direction="row" style={{ marginLeft: "auto" }}>
      <Button onClick={onDelete}>삭제</Button>
      <Button onClick={onEdit}>수정</Button>
    </FlexWrapper>
  </Card>
);

export default AgendaViewer;
