import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";

import AgendaEditorList from "../components/AgendaEditorList";

interface EditAgendaListFrameProps {
  agendaList: AgendaContent[];
  setAgendaList: (agendaContent: AgendaContent[]) => void;
}

const EditAgendaListFrame: React.FC<EditAgendaListFrameProps> = ({
  agendaList,
  setAgendaList,
}: EditAgendaListFrameProps) => (
  <FoldableSectionTitle title="회의 안건">
    <AgendaEditorList agendaList={agendaList} setAgendaList={setAgendaList} />
  </FoldableSectionTitle>
);

export default EditAgendaListFrame;
