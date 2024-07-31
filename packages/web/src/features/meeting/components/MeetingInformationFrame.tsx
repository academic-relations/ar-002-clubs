import React, { useState } from "react";

import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

interface MeetingInformationFrameProps {
  onCreateTemplate?: VoidFunction;
}

const GridContainer = styled.div<{ isGrid?: boolean }>`
  display: grid;
  gap: 32px;
  justify-content: space-between;
  grid-template-columns: ${({ isGrid }) =>
    isGrid ? `repeat(2, 1fr)` : `repeat(3, 1fr)`};
`;

const RowStretchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 32px;
`;

const MeetingInformationFrame: React.FC<MeetingInformationFrameProps> = ({
  onCreateTemplate = undefined,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>회의 정보</SectionTitle>
      <Card outline gap={24} style={{ marginLeft: 24 }}>
        <GridContainer isGrid={checked}>
          <Select
            label="정기회의 여부"
            placeholder="정기회의 여부를 선택해주세요"
            items={[
              { label: "정기회의", value: "정기회의" },
              { label: "비정기회의", value: "비정기회의" },
            ]}
          />
          <Select
            label="회의체 종류"
            placeholder="회의체 종류를 선택해주세요"
            items={[
              {
                label: "전체동아리대표자회의",
                value: "전체동아리대표자회의",
              },
              { label: "확대운영위원회", value: "확대운영위원회" },
              { label: "운영위원회", value: "운영위원회" },
              { label: "분과회의", value: "분과회의" },
            ]}
          />
          <DateInput date={new Date()} label="시작일" />
          {checked && <DateInput date={new Date()} label="종료일" />}
        </GridContainer>
        <RowStretchWrapper>
          <CheckboxOption
            optionText="종료일이 존재합니다"
            checked={checked}
            onClick={() => setChecked(!checked)}
          />
          <TextButton
            text="공고 템플릿 생성"
            disabled={onCreateTemplate === undefined}
            onClick={onCreateTemplate}
          />
        </RowStretchWrapper>
      </Card>
    </FlexWrapper>
  );
};
export default MeetingInformationFrame;
