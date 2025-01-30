import React, { useCallback, useEffect, useState } from "react";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { FormProvider, useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

import saveLocalStorage from "@sparcs-clubs/web/common/services/saveLocalStorage";
import SelectActivityTerm from "@sparcs-clubs/web/features/register-club/components/SelectActivityTerm";

import useGetParticipants from "../services/useGetParticipants";
import { ActivityReportFormData } from "../types/form";

import SelectParticipant from "./SelectParticipant";

interface ActivityReportFormProps {
  clubId: number;
  initialData?: ActivityReportFormData;

  onSubmit: (data: ActivityReportFormData) => void;
}

const ActivityReportForm: React.FC<ActivityReportFormProps> = ({
  clubId,
  initialData = undefined,

  onSubmit,
}) => {
  const formCtx = useForm<ActivityReportFormData>({
    mode: "all",
    defaultValues: initialData,
  });

  const {
    control,
    watch,
    setValue,
    formState: { isValid },
  } = formCtx;

  const submitHandler = useCallback(
    (data: ActivityReportFormData, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      onSubmit(data);
    },
    [onSubmit],
  );

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    formCtx.handleSubmit(_data => submitHandler(_data, e))();
  };

  const durations = watch("durations");
  const participants = watch("participants");
  const evidenceFiles = watch("evidenceFiles");

  const name = watch("name");
  const activityTypeEnumId = watch("activityTypeEnumId");
  const location = watch("location");
  const purpose = watch("purpose");
  const detail = watch("detail");
  const evidence = watch("evidence");

  const [startTerm, setStartTerm] = useState<Date>(
    durations
      ?.map(d => d.startTerm)
      .reduce((a, b) => (a < b ? a : b), new Date()),
  );
  const [endTerm, setEndTerm] = useState<Date>(
    durations
      ?.map(d => d.endTerm)
      .reduce((a, b) => (a > b ? a : b), new Date()),
  );

  const {
    data: participantList,
    isLoading: isLoadingParticipants,
    isError: isErrorParticipants,
    refetch,
  } = useGetParticipants({
    clubId,
    startTerm,
    endTerm,
  });

  useEffect(() => {
    saveLocalStorage("activity-report", {
      name,
      activityTypeEnumId,
      durations,
      location,
      purpose,
      detail,
      evidence,
      evidenceFiles,
      participants,
    });
  }, [
    durations,
    participants,
    evidenceFiles,
    name,
    activityTypeEnumId,
    location,
    purpose,
    detail,
    evidence,
  ]);

  useEffect(() => {
    if (startTerm && endTerm) {
      refetch();
    }
  }, [startTerm, endTerm, refetch]);

  const validInput =
    isValid &&
    durations &&
    durations.length > 0 &&
    participants &&
    participants.length > 0 &&
    evidenceFiles &&
    evidenceFiles.length > 0;

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSubmit}>
        <FlexWrapper direction="column" gap={32}>
          <SectionTitle>활동 정보</SectionTitle>
          <FlexWrapper direction="column" gap={20} padding="0 0 0 24px">
            <Card outline padding="32px" gap={32}>
              <FormController
                name="name"
                required
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="활동명"
                    placeholder="활동명을 입력해주세요"
                  />
                )}
              />

              <FormController
                name="activityTypeEnumId"
                required
                control={control}
                renderItem={props => (
                  <Select
                    {...props}
                    label="활동 분류"
                    items={[
                      {
                        value: ActivityTypeEnum.matchedInternalActivity,
                        label: "동아리 성격에 합치하는 내부 활동",
                        selectable: true,
                      },
                      {
                        value: ActivityTypeEnum.matchedExternalActivity,
                        label: "동아리 성격에 합치하는 외부 활동",
                        selectable: true,
                      },
                      {
                        value: ActivityTypeEnum.notMatchedActivity,
                        label: "동아리 성격에 합치하지 않는 활동",
                        selectable: true,
                      },
                    ]}
                  />
                )}
              />

              <SelectActivityTerm
                initialData={durations ?? []}
                onChange={_durations => {
                  setValue("durations", _durations, { shouldValidate: true });
                  if (_durations.length > 0) {
                    setStartTerm(
                      _durations
                        .map(d => d.startTerm)
                        .reduce((a, b) => (a < b ? a : b)),
                    );
                    setEndTerm(
                      _durations
                        .map(d => d.endTerm)
                        .reduce((a, b) => (a > b ? a : b)),
                    );
                  }

                  setValue("participants", []);
                }}
              />

              <FormController
                name="location"
                required
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="활동 장소"
                    placeholder="활동 장소를 입력해주세요"
                  />
                )}
              />

              <FormController
                name="purpose"
                required
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    label="활동 목적"
                    placeholder="활동 목적을 입력해주세요"
                  />
                )}
              />

              <FormController
                name="detail"
                required
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    area
                    label="활동 내용"
                    placeholder="활동 내용을 입력해주세요"
                  />
                )}
              />
            </Card>
          </FlexWrapper>

          {durations && (
            <AsyncBoundary
              isLoading={isLoadingParticipants}
              isError={isErrorParticipants}
            >
              <SectionTitle>활동 인원</SectionTitle>
              <FlexWrapper direction="column" gap={20} padding="0 0 0 24px">
                <SelectParticipant
                  data={
                    participantList?.students.map(student => ({
                      id: student.id,
                      name: student.name,
                      studentNumber: student.studentNumber.toString(),
                    })) ?? []
                  }
                  value={participants}
                  onChange={_participants => {
                    setValue("participants", _participants, {
                      shouldValidate: true,
                    });
                  }}
                />
              </FlexWrapper>
            </AsyncBoundary>
          )}

          <SectionTitle>활동 증빙</SectionTitle>
          <FlexWrapper direction="column" gap={20} padding="0 0 0 24px">
            <FormController
              name="evidence"
              required
              control={control}
              renderItem={props => (
                <TextInput
                  {...props}
                  area
                  placeholder="활동 증빙에 대해서 작성하고 싶은 것이 있다면 입력해주세요"
                />
              )}
            />

            <FormController
              name="evidenceFiles"
              required
              control={control}
              renderItem={props => (
                <FileUpload
                  {...props}
                  multiple
                  initialFiles={evidenceFiles}
                  onChange={files =>
                    setValue("evidenceFiles", files, { shouldValidate: true })
                  }
                />
              )}
            />
          </FlexWrapper>

          <FlexWrapper direction="row" gap={16} justify="flex-end">
            <Button
              buttonType="submit"
              type={validInput ? "default" : "disabled"}
            >
              저장
            </Button>
          </FlexWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default ActivityReportForm;
