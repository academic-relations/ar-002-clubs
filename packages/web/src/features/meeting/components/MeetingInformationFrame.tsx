import React, { useEffect, useMemo, useState } from "react";

import { ApiMee001RequestBody } from "@sparcs-clubs/interface/api/meeting/apiMee001";
import { MeetingEnum } from "@sparcs-clubs/interface/common/enum/meeting.enum";
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

import { meetingEnumToText } from "../constants/getEnumType";
import { startDate } from "../constants/meetingTemplate";

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
  onCreateTemplate = () => {},
}) => {
  const {
    watch,
    control,
    resetField,
    setValue,
    formState: { isValid },
  } = useFormContext<ApiMee001RequestBody>();

  const isRegular = watch("isRegular");
  const meetingEnumId = watch("meetingEnumId");

  const [time, setTime] = useState<string>("");

  const hasValue = meetingEnumId != null && isRegular != null;
  const isDivisionMeeting = +meetingEnumId === MeetingEnum.divisionMeeting;

  const timePattern = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5]?[0-9])$/;

  const isStartDateValid = useMemo(() => {
    if (startDate == null) return false;

    if (isDivisionMeeting || (!isDivisionMeeting && timePattern.test(time))) {
      return true;
    }
    return false;
  }, [isDivisionMeeting, time]);

  useEffect(() => {
    if (!isDivisionMeeting && timePattern.test(time)) {
      const [hour, minute] = time.split(":").map(part => +part);
      const newDate = new Date();
      newDate.setHours(hour);
      newDate.setMinutes(minute);

      setValue("startDate", newDate);
    }
  }, [isDivisionMeeting, resetField, time]);

  return (
    <FlexWrapper direction="column" gap={40}>
      <SectionTitle>회의 정보</SectionTitle>
      <Card outline gap={24} style={{ marginLeft: 24 }}>
        <FlexWrapper direction="row" gap={32}>
          <FormController
            name="meetingEnumId"
            required
            control={control}
            renderItem={props => (
              <Select
                {...props}
                label="회의체 종류"
                placeholder="회의체 종류를 선택해주세요"
                items={Object.keys(MeetingEnum)
                  .slice(0, 4)
                  .map(value => ({ label: meetingEnumToText(value), value }))}
              />
            )}
          />
          <FormController
            name="isRegular"
            required
            control={control}
            renderItem={props => (
              <Select
                {...props}
                label="정기회의 여부"
                placeholder="정기회의 여부를 선택해주세요"
                items={[
                  { label: "정기회의", value: "true" },
                  { label: "비정기회의", value: "false" },
                ]}
              />
            )}
          />
        </FlexWrapper>
        {hasValue &&
          (!isDivisionMeeting ? (
            <GridView>
              <FormController
                name="startDate"
                required={!isDivisionMeeting}
                control={control}
                defaultValue={new Date()}
                renderItem={props => (
                  <DateInput {...props} date={new Date()} label="일자" />
                )}
              />
              <TextInput
                label="시간"
                placeholder="XX:XX"
                value={time}
                handleChange={value => setTime(value)}
              />
              <FormController
                name="location"
                required={!isDivisionMeeting}
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="장소 (국문)"
                    placeholder="장소를 입력해주세요"
                  />
                )}
              />
              <FormController
                name="locationEn"
                required={!isDivisionMeeting}
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="장소 (영문)"
                    placeholder="장소를 입력해주세요"
                  />
                )}
              />
            </GridView>
          ) : (
            <RowFlexWrapper>
              <FormController
                name="startDate"
                required={isDivisionMeeting}
                control={control}
                defaultValue={new Date()}
                renderItem={props => (
                  <DateInput {...props} date={new Date()} label="시작일" />
                )}
              />
              <FormController
                name="endDate"
                required={isDivisionMeeting}
                control={control}
                defaultValue={new Date()}
                renderItem={props => (
                  <DateInput {...props} date={new Date()} label="종료일" />
                )}
              />
            </RowFlexWrapper>
          ))}
        <AlignEnd>
          <TextButton
            text="공고 템플릿 생성"
            disabled={!isValid || !isStartDateValid}
            onClick={onCreateTemplate}
          />
        </AlignEnd>
      </Card>
    </FlexWrapper>
  );
};
export default MeetingInformationFrame;
