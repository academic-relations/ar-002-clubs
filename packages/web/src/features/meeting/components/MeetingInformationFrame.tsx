import React from "react";

import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
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
  const isSubcommitteeMeeting = false;

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>회의 정보</SectionTitle>
      <Card outline gap={24} style={{ marginLeft: 24 }}>
        <FlexWrapper direction="row" gap={32}>
          {/* // TODO. interface 나오면 enum으로 변경 */}
          <FormController
            name="meetingType"
            required
            renderItem={props => (
              <Select
                {...props}
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
            )}
          />

          {/* // TODO. interface 나오면 enum으로 변경 */}
          <FormController
            name="isRegularMeeting"
            required
            renderItem={props => (
              <Select
                {...props}
                label="정기회의 여부"
                placeholder="정기회의 여부를 선택해주세요"
                items={[
                  { label: "정기회의", value: "1" },
                  { label: "비정기회의", value: "2" },
                ]}
              />
            )}
          />
        </FlexWrapper>
        {hasValue &&
          (!isSubcommitteeMeeting ? (
            <RowFlexWrapper>
              <FormController
                name="date"
                required={!isSubcommitteeMeeting}
                renderItem={props => (
                  <DateInput {...props} date={new Date()} label="일자" />
                )}
              />
              <FormController
                name="time"
                required={!isSubcommitteeMeeting}
                pattern={/^([01]\d|2[0-3]):[0-5]\d$/}
                renderItem={props => (
                  <TextInput {...props} label="시간" placeholder="XX:XX" />
                )}
              />
              <FormController
                name="location"
                required={!isSubcommitteeMeeting}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="장소"
                    placeholder="장소를 입력해주세요"
                  />
                )}
              />
            </RowFlexWrapper>
          ) : (
            <RowFlexWrapper>
              <FormController
                name="startDate"
                required={isSubcommitteeMeeting}
                renderItem={props => (
                  <DateInput {...props} date={new Date()} label="시작일" />
                )}
              />
              <FormController
                name="endDate"
                required={isSubcommitteeMeeting}
                renderItem={props => (
                  <DateInput {...props} date={new Date()} label="종료일" />
                )}
              />
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
