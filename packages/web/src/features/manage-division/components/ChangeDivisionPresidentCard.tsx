import { useState } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import DivisionCard from "@sparcs-clubs/web/features/manage-division/components/_atomic/DivisionCard";
import ChangeDivisionPresident from "@sparcs-clubs/web/features/manage-division/components/ChangeDivisionPresident";

const ChangeDivisionPresidentCard = () => {
  const hasChangeNotice = true;
  const isSelectDisabled = true;

  const mockPresidentCandidateList = [
    "20210227 박병찬",
    "20200510 이지윤",
    "20240503 이민욱",
  ];

  const [mockPresident, setMockPresident] = useState<string>(
    mockPresidentCandidateList[0],
  );

  return (
    <DivisionCard outline padding="32px" gap={32}>
      <Typography fw="MEDIUM" fs={20} lh={24}>
        분과 학생회장
      </Typography>
      {hasChangeNotice && (
        <ChangeDivisionPresident
          status="Requested"
          actingPresident
          change={["20210227 박병찬", "20200510 이지윤"]}
        />
      )}
      <FlexWrapper gap={4} direction="column">
        <Typography fw="MEDIUM" fs={16} lh={24}>
          학생회장
        </Typography>
        <Select
          items={mockPresidentCandidateList.map((item, _) => ({
            value: item,
            label: item,
          }))}
          value={mockPresident}
          onChange={setMockPresident}
          disabled={isSelectDisabled}
        />
      </FlexWrapper>
    </DivisionCard>
  );
};

export default ChangeDivisionPresidentCard;
