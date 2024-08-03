import React from "react";

import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

interface MeetingInformationFrameProps {
  onCreateTemplate?: VoidFunction;
}

const RowFlexWrapper = styled.div`
  display: flex;
  direction: row;
  gap: 32px;

  & > * {
    flex: 1;
  }
`;
const AlignEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MeetingInformationFrame: React.FC<MeetingInformationFrameProps> = ({
  onCreateTemplate = undefined,
}) => {
  // TODO. react-hook form 사용
  const hasValue = true;
  const isValid = true;
  const isSubcommitteeMeeting = true;

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>회의 정보</SectionTitle>
      <Card outline gap={24} style={{ marginLeft: 24 }}>
        <FlexWrapper direction="row" gap={32}>
          {/* // TODO. interface 나오면 enum으로 변경 */}
          <Select
            label="회의체 종류"
            placeholder="회의체 종류를 선택해주세요"
            items={[
              {
                label: "전체동아리대표자회의",
                value: "1",
              },
              { label: "확대운영위원회", value: "2" },
              { label: "운영위원회", value: "3" },
              { label: "분과회의", value: "4" },
            ]}
          />
          {/* // TODO. interface 나오면 enum으로 변경 */}
          <Select
            label="정기회의 여부"
            placeholder="정기회의 여부를 선택해주세요"
            items={[
              { label: "정기회의", value: "1" },
              { label: "비정기회의", value: "2" },
            ]}
          />
        </FlexWrapper>

        {hasValue &&
          (isSubcommitteeMeeting ? (
            <RowFlexWrapper>
              <DateInput date={new Date()} label="일자" />
              <TextInput label="시간" placeholder="XX:XX" />
              <TextInput label="장소" placeholder="장소를 입력해주세요" />
            </RowFlexWrapper>
          ) : (
            <RowFlexWrapper>
              <DateInput date={new Date()} label="시작일" />
              <DateInput date={new Date()} label="종료일" />
            </RowFlexWrapper>
          ))}
        <AlignEnd>
          <TextButton
            text="공고 템플릿 생성"
            disabled={onCreateTemplate === undefined || !isValid}
            onClick={onCreateTemplate}
          />
        </AlignEnd>
      </Card>
    </FlexWrapper>
  );
};
export default MeetingInformationFrame;
