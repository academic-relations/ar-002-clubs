import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";

import { AgendaTypeEnum } from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaType";

import AgendaBlock from "./_atomic/AgendaBlock";

interface AgendaEditorListProps {
  agendaList: AgendaContent[];
  setAgendaList: (agendaList: AgendaContent[]) => void;
}

const AgendaEditorList: React.FC<AgendaEditorListProps> = ({
  agendaList,
  setAgendaList,
}: AgendaEditorListProps) => {
  const getIndexAmongSameType = () => {
    const countMap = new Map<AgendaTypeEnum, number>();

    return agendaList.map((agendaContent: AgendaContent) => {
      if (!countMap.has(agendaContent.type)) {
        countMap.set(agendaContent.type, 1);
      }

      const currentIndex = countMap.get(agendaContent.type) as number;
      countMap.set(agendaContent.type, currentIndex + 1);

      return currentIndex;
    });
  };

  const indexAmongSameType = getIndexAmongSameType();

  const setOneAgendaContent = (index: number, value: AgendaContent) => {
    const newAgendaList = [...agendaList];
    newAgendaList[index] = value;
    setAgendaList(newAgendaList);
  };

  const decreaseIndex = (index: number) => {
    if (index === 0) return;

    const newAgendaList = [...agendaList];
    [newAgendaList[index], newAgendaList[index - 1]] = [
      newAgendaList[index - 1],
      newAgendaList[index],
    ];
    setAgendaList(newAgendaList);
  };

  const increaseIndex = (index: number) => {
    if (index === agendaList.length - 1) return;

    const newAgendaList = [...agendaList];
    [newAgendaList[index], newAgendaList[index + 1]] = [
      newAgendaList[index + 1],
      newAgendaList[index],
    ];
    setAgendaList(newAgendaList);
  };

  const deleteAgenda = (index: number) => {
    const newAgendaList = [...agendaList];
    newAgendaList.splice(index, 1);
    setAgendaList(newAgendaList);
  };

  const addAgenda = () => {
    const newAgendaList = [...agendaList];
    newAgendaList.push({
      type: AgendaTypeEnum.Report,
      title: undefined,
      content: undefined,
    });
    setAgendaList(newAgendaList);
  };

  return (
    <FlexWrapper gap={24} direction="column">
      {agendaList.map((agendaContent, index) => (
        <AgendaBlock
          key={`${index.toString}`}
          agendaContent={agendaContent}
          setAgendaContent={(value: AgendaContent) =>
            setOneAgendaContent(index, value)
          }
          isFirst={index === 0}
          isLast={index === agendaList.length - 1}
          decreaseIndex={() => decreaseIndex(index)}
          increaseIndex={() => increaseIndex(index)}
          onDelete={() => deleteAgenda(index)}
          indexAmongSameType={indexAmongSameType[index]}
        />
      ))}
      <Button onClick={addAgenda}>+ 회의 안건 추가</Button>
    </FlexWrapper>
  );
};

export default AgendaEditorList;
