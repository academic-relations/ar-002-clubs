import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiAct003RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

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
import useGetParticipants from "@sparcs-clubs/web/features/activity-report/services/useGetParticipants";
import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";
import SelectActivityTerm from "@sparcs-clubs/web/features/register-club/components/SelectActivityTerm";
import { Duration } from "@sparcs-clubs/web/features/register-club/types/registerClub";
import { utcToKst } from "@sparcs-clubs/web/utils/Date/extractDate";

import SelectParticipant from "../components/SelectParticipant";
import { usePutActivityReport } from "../services/usePutActivityReport";
import { Participant } from "../types/activityReport";

const SectionInner = styled.div`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const ButtonPlaceRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
`;

type ActivityReportForm = ApiAct003RequestBody & {
  evidenceFiles: { fileId: string; name: string; url: string }[];
};

interface ActivityReportEditFrameProps {
  id: string;
  clubId: number;
}

const ActivityReportEditFrame: React.FC<ActivityReportEditFrameProps> = ({
  id,
  clubId,
}) => {
  const formCtx = useForm<ActivityReportForm>({ mode: "all" });

  const { data, isLoading, isError } = useGetActivityReport(
    "undergraduate",
    Number(id),
  );

  const router = useRouter();

  useEffect(() => {
    if (data) {
      /* NOTE: (@dora) request body of put should not include clubId */
      formCtx.reset({
        name: data.name,
        activityTypeEnumId: data.activityTypeEnumId,
        durations: data.durations,
        location: data.location,
        purpose: data.purpose,
        detail: data.detail,
        evidence: data.evidence,
        evidenceFiles: data.evidenceFiles,
        participants: data.participants,
      });
      /* TODO: (@dora) refactor to use lodash */
      // formCtx.reset(_.omit(activityReportData, "clubId"));
    }
  }, [data, formCtx]);

  const { mutate } = usePutActivityReport();

  const submitHandler = useCallback(
    (_data: ActivityReportForm, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      mutate(
        {
          activityId: Number(id),
          body: {
            ..._data,
            durations: _data.durations.map(({ startTerm, endTerm }) => ({
              startTerm: utcToKst(startTerm),
              endTerm: utcToKst(endTerm),
            })),
            participants: _data.participants.map(({ studentId }) => ({
              studentId,
            })),
          },
        },
        {
          onSuccess: () => {
            router.push(`/manage-club/activity-report/${id}`);
          },
        },
      );
    },
    [id, router, mutate],
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

  const durations: Duration[] = watch("durations");

  // TODO: (@dora) use type FileDetail
  // TODO: (@dora) fix type
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
    setStartTerm(prevStartTerm =>
      durations
        ?.map(d => d.startTerm)
        .reduce((a, b) => (a < b ? a : b), prevStartTerm),
    );
    setEndTerm(prevEndTerm =>
      durations
        ?.map(d => d.endTerm)
        .reduce((a, b) => (a > b ? a : b), prevEndTerm),
    );
  }, [durations]);

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
  const participantList = useMemo(
    () => participantData?.students ?? [],
    [participantData],
  );

  useEffect(() => {
    if (startTerm && endTerm) {
      refetch();
    }
  }, [startTerm, endTerm]);

  const initialParticipants: { studentId: number }[] = watch("participants");
  const [selectedParticipants, setSelectedParticipants] = useState<
    Participant[]
  >([]);

  console.log(selectedParticipants, initialParticipants, participantData);

  useEffect(() => {
    if (initialParticipants && participantData) {
      setSelectedParticipants(
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
      _data.map(d => ({ fileId: d.fileId, name: "", url: "" })),
      {
        shouldValidate: true,
      },
    );
    formCtx.trigger(fileId);
  };

  const validInput = useMemo(
    () =>
      isValid && durations && selectedParticipants.length > 0 && evidenceFiles,
    [durations, selectedParticipants, evidenceFiles, isValid],
  );

  if (!data) return null;

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 수정"
        enableLast
      />

      <AsyncBoundary
        isLoading={
          isLoading || initialDurations.length === 0 || isLoadingParticipants
        }
        isError={isError || isErrorParticipants}
      >
        <FormProvider {...formCtx}>
          <form onSubmit={handleSubmit}>
            <FlexWrapper direction="column" gap={32}>
              <SectionTitle>활동 정보</SectionTitle>
              <SectionInner>
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
                      setValue("durations", terms, {
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
                      formCtx.trigger("durations");

                      setSelectedParticipants([]);
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
              </SectionInner>

              <SectionTitle>활동 인원</SectionTitle>
              <SectionInner>
                {durations && (
                  <AsyncBoundary isLoading={isLoading} isError={isError}>
                    <SelectParticipant
                      data={participantList}
                      value={selectedParticipants}
                      onChange={v => {
                        setSelectedParticipants(v);

                        const participantIds = v.map(_data => ({
                          studentId: +_data.id,
                        }));
                        console.log("participantIds", participantIds);
                        formCtx.setValue("participants", participantIds);
                        formCtx.trigger("participants");
                      }}
                    />
                  </AsyncBoundary>
                )}
              </SectionInner>
              <SectionTitle>활동 증빙</SectionTitle>
              <SectionInner>
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
              </SectionInner>

              <ButtonPlaceRight>
                <Button
                  buttonType="submit"
                  type={validInput ? "default" : "disabled"}
                >
                  저장
                </Button>
              </ButtonPlaceRight>
            </FlexWrapper>
          </form>
        </FormProvider>
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default ActivityReportEditFrame;
