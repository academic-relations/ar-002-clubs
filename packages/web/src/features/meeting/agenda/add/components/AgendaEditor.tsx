import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";

import { AgendaTypeEnum } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";

interface AgendaEditorProps {
  agendaContent: AgendaContent;
  onDelete: () => void;
  onSave: () => void;
  onChange: (agendaContent: AgendaContent) => void;
}

// TODO: Impl TextArea
const TextEditor = styled.input.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})`
  border: 1px solid ${({ theme }) => theme.colors.PRIMARY};
  padding: 32px;
`;

const AgendaEditor: React.FC<AgendaEditorProps> = ({
  agendaContent,
  onDelete,
  onSave,
  onChange,
}: AgendaEditorProps) => (
  <Card outline gap={32}>
    <FlexWrapper gap={4} direction="column">
      <Typography fs={16} lh={20} fw="MEDIUM">
        안건 종류
      </Typography>
      <Select
        items={Object.values(AgendaTypeEnum).map((value: AgendaTypeEnum) => ({
          label: `${value}안건`,
          value,
        }))}
        value={agendaContent.type}
        onChange={(value: AgendaTypeEnum) => {
          onChange({
            ...agendaContent,
            type: value,
          });
        }}
      />
    </FlexWrapper>
    <FlexWrapper gap={4} direction="column">
      <Typography fs={16} lh={20} fw="MEDIUM">
        안건 제목
      </Typography>
      <TextInput
        placeholder="안건 제목을 입력해주세요"
        value={agendaContent.title}
        handleChange={(title: string) =>
          onChange({
            ...agendaContent,
            title,
          })
        }
      />
    </FlexWrapper>
    <FlexWrapper gap={4} direction="column">
      <Typography fs={16} lh={20} fw="MEDIUM">
        안건 내용
      </Typography>
      <TextEditor
        value={agendaContent.content}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange({
            ...agendaContent,
            content: event.target.value,
          });
        }}
      />
    </FlexWrapper>
    <FlexWrapper gap={10} direction="row" style={{ marginLeft: "auto" }}>
      <Button onClick={onDelete}>삭제</Button>
      <Button onClick={onSave}>저장</Button>
    </FlexWrapper>
  </Card>
);

export default AgendaEditor;
