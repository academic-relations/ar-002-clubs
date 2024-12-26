import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiAct001RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { FormProvider, useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

import SelectActivityTerm from "@sparcs-clubs/web/features/register-club/components/SelectActivityTerm";
import { Duration } from "@sparcs-clubs/web/features/register-club/types/registerClub";

import { utcToKst } from "@sparcs-clubs/web/utils/Date/extractDate";

import SelectParticipant from "../components/SelectParticipant";
import useGetParticipants from "../services/useGetParticipants";
import usePostActivityReport from "../services/usePostActivityReport";
import { Participant } from "../types/activityReport";

type ActivityReportForm = ApiAct001RequestBody & {
  evidenceFiles: { uid: string; name: string; url: string }[];
};

interface ActivityReportCreateFrameProps {
  clubId: number;
}

const ActivityReportCreateFrame: React.FC<ActivityReportCreateFrameProps> = ({
  clubId,
}) => {
  const formCtx = useForm<ActivityReportForm>({ mode: "all" });

  const { mutate } = usePostActivityReport();

  const submitHandler = useCallback(
    (_data: ActivityReportForm, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      mutate(
        {
          body: {
            ..._data,
            clubId,
            duration: _data.duration.map(({ startTerm, endTerm }) => ({
              startTerm: utcToKst(startTerm),
              endTerm: utcToKst(endTerm),
            })),
            evidence: _data.evidence ?? "", // NOTE: (@dora) evidence is optional
            participants: _data.participants.map(({ studentId }) => ({
              studentId,
            })),
          },
        },
        {
          onSuccess: () => {
            window.location.href = "/manage-club/activity-report";
          },
        },
      );
    },
    [clubId, mutate],
  );

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    formCtx.handleSubmit(_data => submitHandler(_data, e))();
  };

  const {
    control,
    watch,
    setValue,
    formState: { isValid },
  } = formCtx;

  const durations: Duration[] = watch("duration");

  // TODO: (@dora) use type FileDetail
  // TODO: (@dora) fix type
  const rawEvidenceFiles: { uid: string; name: string; url: string }[] =
    watch("evidenceFiles");
  const evidenceFiles: FileDetail[] = useMemo(
    () =>
      rawEvidenceFiles
        ? rawEvidenceFiles.map(file => ({
            id: file.uid,
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
      .reduce((a, b) => (a < b ? a : b), new Date()) ?? new Date(),
  );
  const [endTerm, setEndTerm] = useState<Date>(
    durations
      ?.map(d => d.endTerm)
      .reduce((a, b) => (a > b ? a : b), new Date()) ?? new Date(),
  );

  const {
    data: participantData,
    isLoading: isLoadingParticipants,
    isError: isErrorParticipants,
    refetch,
  } = useGetParticipants({
    clubId,
    startTerm: utcToKst(startTerm),
    endTerm: utcToKst(endTerm),
  });

  useEffect(() => {
    if (startTerm && endTerm) {
      refetch();
    }
  }, [startTerm, endTerm]);

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
    formCtx.setValue(
      fileId,
      _data.map(d => ({ uid: d.fileId, name: "", url: "" })),
      {
        shouldValidate: true,
      },
    );
    formCtx.trigger(fileId);
  };

  const validInput = useMemo(
    () => isValid && durations && participants.length > 0 && evidenceFiles,
    [durations, participants, evidenceFiles, isValid],
  );

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 작성"
        enableLast
      />
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

                {/* <FlexWrapper direction="row" gap={32}> */}
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
                    setValue("duration", terms, {
                      shouldValidate: true,
                    });
                    setStartTerm(
                      terms
                        .map(d => d.startTerm)
                        .reduce((a, b) => (a < b ? a : b)),
                    );
                    setEndTerm(
                      terms
                        .map(d => d.endTerm)
                        .reduce((a, b) => (a > b ? a : b)),
                    );
                    formCtx.trigger("duration");

                    setParticipants([]);
                  }}
                />
                {/* </FlexWrapper> */}
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
                  {durations && (
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
                  )}
                </FlexWrapper>
              </AsyncBoundary>
            )}
            <SectionTitle>활동 증빙</SectionTitle>
            <FlexWrapper direction="column" gap={20} padding="0 0 0 24px">
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
    </FlexWrapper>
  );
};

export default ActivityReportCreateFrame;
