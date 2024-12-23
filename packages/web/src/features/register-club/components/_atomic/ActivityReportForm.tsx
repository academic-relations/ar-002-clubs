import React, { useEffect, useMemo, useState } from "react";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { addHours } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import useGetParticipants from "@sparcs-clubs/web/features/activity-report/services/useGetParticipants";
import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";
import { Participant } from "@sparcs-clubs/web/features/manage-club/activity-report/types/activityReport";
import { Duration } from "@sparcs-clubs/web/features/register-club/types/registerClub";

import SelectActivityTerm from "../SelectActivityTerm";

interface ActivityReportFormProps {
  clubId: number;
  formCtx: ReturnType<typeof useForm>;
  onCancel: () => void;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  canCancel?: boolean;
}

const ActivityReportForm: React.FC<ActivityReportFormProps> = ({
  clubId,
  formCtx,
  onCancel,
  onSubmit,
  canCancel = true,
}) => {
  const {
    control,
    watch,
    setValue,
    formState: { isValid },
  } = formCtx;

  const durations: Duration[] = watch("durations");

  // TODO: (@dora) use type FileDetail
  const rawEvidenceFiles: { fileId: string; name: string; url: string }[] =
    watch("evidenceFiles");
  const evidenceFiles: FileDetail[] = useMemo(
    () =>
      rawEvidenceFiles
        ? rawEvidenceFiles.map(file => ({
            id: file.fileId,
            name: file.name,
            url: file.url,
          }))
        : [],
    [rawEvidenceFiles],
  );

  const initialDurations = useMemo(() => durations ?? [], [durations]);

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
  useEffect(() => {
    setStartTerm(
      durations
        ?.map(d => d.startTerm)
        .reduce((a, b) => (a < b ? a : b), new Date()),
    );
    setEndTerm(
      durations
        ?.map(d => d.endTerm)
        .reduce((a, b) => (a > b ? a : b), new Date()),
    );
  }, [durations]);

  const {
    data: participantData,
    isLoading,
    isError,
    refetch,
  } = useGetParticipants({
    clubId,
    startTerm: addHours(startTerm, 9),
    endTerm: addHours(endTerm, 9),
  });
  const initialParticipants: { studentId: number }[] = watch("participants");
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (initialParticipants && participantData) {
      setParticipants(
        participantData.students.filter(student =>
          initialParticipants.some(
            participant => participant.studentId === student.id,
          ),
        ),
      );
    }
  }, [initialParticipants, participantData]);

  /* TODO: (@dora) refactor !!!!! */
  type FileIdType = "evidenceFiles";
  const updateMultipleFile = (
    fileId: FileIdType,
    _data: { fileId: string }[],
  ) => {
    formCtx.setValue(fileId, _data, { shouldValidate: true });
    formCtx.trigger(fileId);
  };

  const validInput = useMemo(
    () => isValid && durations && participants.length > 0 && evidenceFiles,
    [durations, participants, evidenceFiles, isValid],
  );

  return (
    <AsyncBoundary isLoading={initialDurations.length === 0} isError={false}>
      <FormProvider {...formCtx}>
        <form onSubmit={onSubmit}>
          <FlexWrapper direction="column" gap={32}>
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

            <FlexWrapper direction="row" gap={32}>
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
                initialData={initialDurations}
                onChange={terms => {
                  setValue("durations", terms, {
                    shouldValidate: true,
                  });
                  setStartTerm(
                    terms
                      .map(d => d.startTerm)
                      .reduce((a, b) => (a < b ? a : b)),
                  );
                  setEndTerm(
                    terms.map(d => d.endTerm).reduce((a, b) => (a > b ? a : b)),
                  );
                  formCtx.trigger("durations");

                  // TODO: (@dora) refetch participants one step late
                  refetch();
                  setParticipants([]);
                }}
              />
            </FlexWrapper>
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
            {durations && (
              <FlexWrapper direction="column" gap={4}>
                <Typography fs={16} lh={20} fw="MEDIUM" color="BLACK">
                  활동 인원
                </Typography>
                <AsyncBoundary isLoading={isLoading} isError={isError}>
                  <SelectParticipant
                    data={participantData?.students ?? []}
                    value={participants}
                    onChange={v => {
                      setParticipants(v);

                      const participantIds = v.map(_data => ({
                        studentId: +_data.id,
                      }));
                      formCtx.setValue("participants", participantIds);
                      formCtx.trigger("participants");
                    }}
                  />
                </AsyncBoundary>
              </FlexWrapper>
            )}
            <FlexWrapper direction="column" gap={4}>
              <Typography fs={16} lh={20} fw="MEDIUM" color="BLACK">
                활동 증빙
              </Typography>
              <FormController
                name="evidence"
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    area
                    placeholder="(선택) 활동 증빙에 대해서 작성하고 싶은 것이 있다면 입력해주세요"
                  />
                )}
              />
              {evidenceFiles && (
                <FormController
                  name="evidenceFiles"
                  required
                  control={control}
                  renderItem={props => (
                    <FileUpload
                      {...props}
                      multiple
                      initialFiles={evidenceFiles}
                      onChange={_data => {
                        updateMultipleFile(
                          "evidenceFiles",
                          _data.map(d => ({
                            fileId: d,
                          })),
                        );
                      }}
                    />
                  )}
                />
              )}
            </FlexWrapper>
            <FlexWrapper
              direction="row"
              gap={0}
              style={
                canCancel
                  ? { justifyContent: "space-between" }
                  : { justifyContent: "flex-end" }
              }
            >
              {canCancel && (
                <Button type="outlined" onClick={onCancel}>
                  취소
                </Button>
              )}

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
    </AsyncBoundary>
  );
};

export default ActivityReportForm;
