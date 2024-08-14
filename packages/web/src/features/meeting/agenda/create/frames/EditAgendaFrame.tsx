// TODO: figma 맞춰서

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import AgendaContent from "@sparcs-clubs/web/features/meeting/agenda/constants/agendaContent";
import MeetingAttendanceFrame, {
  ClubRepresentative,
  DivisionPresident,
  President,
} from "@sparcs-clubs/web/features/meeting/agenda/create/frames/MeetingAttendanceFrame";

interface EditAgendaFrameProps {
  agendaList: AgendaContent[];
  setAgendaList: (agendaContent: AgendaContent[]) => void;
}

const EditAgendaFrame: React.FC<EditAgendaFrameProps> = () => {
  const mockPresidentList: President[] = [
    { position: "회장", name: "권혁원" },
    { position: "부회장", name: "조현준" },
  ];

  const mockClubRepresentativeList: ClubRepresentative[] = Array.from(
    { length: 6 },
    (_, i) => {
      let division;
      if (i < 2) division = "상임동아리";
      else if (i < 4) division = "정동아리";
      else division = "가동아리";

      return {
        division,
        clubName: "술박스",
        name: "김XX",
      };
    },
  );

  const mockDivisionPresidentList: DivisionPresident[] = [
    "생활문화",
    "연행예술",
    "전시창작",
    "밴드음악",
    "보컬음악",
    "연주음악",
    "사회",
    "종교",
    "구기체육",
    "생활체육",
    "이공학술",
    "인문학술",
  ].map((division: string) => ({
    division,
    name: "김XX",
  }));

  return (
    <FlexWrapper gap={60} direction="column">
      {/* <MeetingInformationFrame/> */}{" "}
      {/* TODO: 이거 넣으면 오류 나서 주석으로 남겨놓을게요 */}
      <MeetingAttendanceFrame
        presidentList={mockPresidentList}
        clubRepresentativeList={mockClubRepresentativeList}
        divisionPresidentList={mockDivisionPresidentList}
      />
    </FlexWrapper>
  );
};

export default EditAgendaFrame;
