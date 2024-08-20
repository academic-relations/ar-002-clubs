import React from "react";

import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

import { formatDotDate } from "@sparcs-clubs/web/utils/Date/formatDate";

interface MeetingInformationFrameProps {
  readOnly?: boolean;
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

const GridView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 32px;
`;
const AlignEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MeetingInformationFrame: React.FC<MeetingInformationFrameProps> = ({
  readOnly = false,
  onCreateTemplate = () => {},
}) => {
  const {
    watch,
    control,
    formState: { isValid },
  } = useFormContext();

  const isRegular = watch("isRegular");
  const meetingType = watch("meetingType");

  const hasValue = meetingType != null && isRegular != null;
  const isSubcommitteeMeeting = meetingType === "분과회의";

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>회의 정보</SectionTitle>
      <Card outline gap={24} style={{ marginLeft: 24 }}>
        <FlexWrapper direction="row" gap={32}>
          {/* // TODO. interface 나오면 enum으로 변경 */}
          <FormController
            name="meetingType"
            required
            control={control}
            renderItem={props => (
              <Select
                {...props}
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
                disabled={readOnly}
              />
            )}
          />

          {/* // TODO. interface 나오면 enum으로 변경 */}
          <FormController
            name="isRegular"
            control={control}
            renderItem={props => (
              <Select
                {...props}
                label="정기회의 여부"
                placeholder="정기회의 여부를 선택해주세요"
                items={[
                  { label: "정기회의", value: true },
                  { label: "비정기회의", value: false },
                ]}
                disabled={readOnly}
              />
            )}
          />
        </FlexWrapper>
        {hasValue &&
          (!isSubcommitteeMeeting ? (
            <GridView>
              <FormController
                name="date"
                control={control}
                required={!isSubcommitteeMeeting}
                defaultValue={formatDotDate(new Date())}
                renderItem={props => (
                  <DateInput
                    {...props}
                    date={new Date()}
                    label="일자"
                    // disabled={readOnly}
                  />
                )}
              />
              <FormController
                name="time"
                control={control}
                required={!isSubcommitteeMeeting}
                pattern={/^(0?[0-9]|1[0-9]|2[0-3]):([0-5]?[0-9])$/}
                maxLength={5}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="시간"
                    placeholder="XX:XX"
                    disabled={readOnly}
                  />
                )}
              />
              <FormController
                name="location"
                required={!isSubcommitteeMeeting}
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="장소 (국문)"
                    placeholder="장소를 입력해주세요"
                    disabled={readOnly}
                  />
                )}
              />
              <FormController
                name="locationEn"
                required={!isSubcommitteeMeeting}
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="장소 (영문)"
                    placeholder="장소를 입력해주세요"
                    disabled={readOnly}
                  />
                )}
              />
            </GridView>
          ) : (
            <RowFlexWrapper>
              <FormController
                name="startDate"
                required={isSubcommitteeMeeting}
                control={control}
                defaultValue={formatDotDate(new Date())}
                renderItem={props => (
                  <DateInput
                    {...props}
                    date={new Date()}
                    label="시작일"
                    // disabled={readOnly}
                  />
                )}
              />
              <FormController
                name="endDate"
                required={isSubcommitteeMeeting}
                control={control}
                defaultValue={formatDotDate(new Date())}
                renderItem={props => (
                  <DateInput
                    {...props}
                    date={new Date()}
                    label="종료일"
                    // disabled={readOnly}
                  />
                )}
              />
            </RowFlexWrapper>
          ))}
        <AlignEnd>
          <TextButton
            text="공고 템플릿 생성"
            disabled={!isValid || readOnly}
            onClick={onCreateTemplate}
          />
        </AlignEnd>
      </Card>
    </FlexWrapper>
  );
};
export default MeetingInformationFrame;
