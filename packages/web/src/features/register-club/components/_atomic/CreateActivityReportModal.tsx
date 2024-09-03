import React, { useCallback, useEffect, useState } from "react";

import { ApiAct007RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct007";
import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockParticipantData } from "@sparcs-clubs/web/features/manage-club/activity-report/_mock/mock";
import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";
import usePostActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePostActivityReportForNewClub";

import SelectActivityTerm from "../SelectActivityTerm";

interface CreateActivityReportModalProps {
  clubId: number;
  isOpen: boolean;
  close: VoidFunction;
  refetch?: () => void;
}

const HorizontalPlacer = styled.div`
  display: flex;
  gap: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// TODO. 활동기간 리스트 추가, 파일업로드 추가
const CreateActivityReportModal: React.FC<CreateActivityReportModalProps> = ({
  clubId,
  isOpen,
  close,
  refetch = () => {},
}) => {
  const formCtx = useForm<ApiAct007RequestBody>({ mode: "all" });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = formCtx;

  /* TODO: (@dora) refactor !!!!! */
  type FileIdType = "evidenceFiles";
  const updateMultipleFile = (
    fileId: FileIdType,
    data: { fileId: string }[],
  ) => {
    setValue(fileId, data, { shouldValidate: true });
  };

  useEffect(() => {
    if (clubId) setValue("clubId", clubId, { shouldValidate: true });
  }, [clubId]);

  const { mutate } = usePostActivityReportForNewClub();

  const [participants, setParticipants] = useState<{ studentId: number }[]>([]);

  const submitHandler = useCallback(
    (data: ApiAct007RequestBody) => {
      mutate(
        { body: { ...data, participants } },
        {
          onSuccess: close,
        },
      );
      refetch();
    },
    [close, mutate, participants],
  );

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Modal isOpen={isOpen}>
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

            <HorizontalPlacer>
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

              <FormController
                name="activityTypeEnumId"
                required
                control={control}
                renderItem={() => (
                  <SelectActivityTerm
                    onChange={terms => {
                      const processedTerms = terms.map(term => ({
                        startTerm: new Date(
                          `${term.startDate.replace(".", "-")}`,
                        ),
                        endTerm: new Date(`${term.endDate.replace(".", "-")}`),
                      }));
                      setValue("durations", processedTerms, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
            </HorizontalPlacer>
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
            <FlexWrapper direction="column" gap={4}>
              <Typography fs={16} lh={20} fw="MEDIUM" color="BLACK">
                활동 인원
              </Typography>
              <SelectParticipant
                data={mockParticipantData}
                onSelected={selectList => {
                  const participantIds = selectList.map(data => ({
                    studentId: +data.studentId,
                  }));
                  setParticipants(participantIds);
                }}
              />
            </FlexWrapper>
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
              <FormController
                name="evidenceFiles"
                control={control}
                renderItem={props => (
                  <FileUpload
                    {...props}
                    multiple
                    onChange={data => {
                      updateMultipleFile(
                        "evidenceFiles",
                        data.map(d => ({
                          fileId: d,
                        })),
                      );
                    }}
                  />
                )}
              />
            </FlexWrapper>
            <ButtonWrapper>
              <Button type="outlined" onClick={close}>
                취소
              </Button>
              <Button
                buttonType="submit"
                type={isValid ? "default" : "disabled"}
              >
                저장
              </Button>
            </ButtonWrapper>
          </FlexWrapper>
        </Modal>
      </form>
    </FormProvider>
  );
};

export default CreateActivityReportModal;
