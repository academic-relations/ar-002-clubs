import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiReg009RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg009";
import apiReg011 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg011";
import {
  RegistrationDeadlineEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import Info from "@sparcs-clubs/web/common/components/Info";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import WarningInfo from "@sparcs-clubs/web/common/components/WarningInfo";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import useGetClubRegistration from "@sparcs-clubs/web/features/my/services/useGetClubRegistration";
import usePutClubRegistration from "@sparcs-clubs/web/features/my/services/usePutClubRegistration";
import ActivityReportFrame from "@sparcs-clubs/web/features/register-club/components/ActivityReportFrame";
import AdvancedInformFrame from "@sparcs-clubs/web/features/register-club/components/AdvancedInformFrame";
import BasicInformFrame from "@sparcs-clubs/web/features/register-club/components/BasicInformFrame";
import ClubRulesFrame from "@sparcs-clubs/web/features/register-club/components/ClubRulesFrame";
import ProvisionalBasicInformFrame from "@sparcs-clubs/web/features/register-club/components/ProvisionalBasicInformFrame";
import computeErrorMessage from "@sparcs-clubs/web/features/register-club/utils/computeErrorMessage";
import { isProvisional } from "@sparcs-clubs/web/features/register-club/utils/registrationType";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

interface RegisterClubMainFrameProps {
  applyId: number;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MyRegisterClubEditFrame: React.FC<RegisterClubMainFrameProps> = ({
  applyId,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isAgreed, setIsAgreed] = useState(false);

  const {
    data: termData,
    isLoading: isLoadingTerm,
    isError: isErrorTerm,
  } = useGetRegistrationTerm();
  // const [isRegistrationPeriod, setIsRegistrationPeriod] = useState<boolean>();
  const [clubRegistrationPeriodEnd, setClubRegistrationPeriodEnd] =
    useState<Date>(new Date());

  useEffect(() => {
    if (termData) {
      const now = new Date();
      const currentEvents = termData.events.filter(
        event => now >= event.startTerm && now <= event.endTerm,
      );
      if (currentEvents.length === 0) {
        // setIsRegistrationPeriod(false);
        return;
      }
      const registrationEvent = currentEvents.filter(
        event =>
          event.registrationEventEnumId ===
          RegistrationDeadlineEnum.ClubRegistrationApplication,
      );
      if (registrationEvent.length > 0) {
        // setIsRegistrationPeriod(true);
        setClubRegistrationPeriodEnd(registrationEvent[0].endTerm);
      } else {
        // setIsRegistrationPeriod(false);
      }
    }
  }, [termData]);

  const formCtx = useForm<ApiReg009RequestBody>({
    mode: "all",
  });

  const {
    data: detail,
    isLoading,
    isError,
  } = useGetClubRegistration({
    applyId: +applyId,
  });

  useEffect(() => {
    if (detail) {
      formCtx.reset({
        registrationTypeEnumId: detail.registrationTypeEnumId,
        clubId: detail.clubId,
        clubNameKr: detail.newClubNameKr,
        clubNameEn: detail.newClubNameEn,
        phoneNumber: detail.representative?.phoneNumber,
        foundedAt: detail.foundedAt,
        divisionId: detail.divisionId,
        activityFieldKr: detail.activityFieldKr,
        activityFieldEn: detail.activityFieldEn,
        professor: detail.professor,
        divisionConsistency: detail.divisionConsistency,
        foundationPurpose: detail.foundationPurpose,
        activityPlan: detail.activityPlan,
        activityPlanFileId: detail.activityPlanFile?.id,
        clubRuleFileId: detail.clubRuleFile?.id,
        externalInstructionFileId: detail.externalInstructionFile?.id,
      });
    }
  }, [detail, formCtx]);

  const {
    watch,
    handleSubmit,
    // formState: { isValid },
  } = formCtx;

  const clubId = watch("clubId");
  const registrationTypeEnumId = watch("registrationTypeEnumId");
  const phoneNumber = watch("phoneNumber");
  const foundedAt = watch("foundedAt");
  const divisionId = watch("divisionId");
  const activityFieldKr = watch("activityFieldKr");
  const activityFieldEn = watch("activityFieldEn");
  const divisionConsistency = watch("divisionConsistency");
  const foundationPurpose = watch("foundationPurpose");
  const activityPlan = watch("activityPlan");
  const activityPlanFileId = watch("activityPlanFileId");
  const clubRuleFileId = watch("clubRuleFileId");
  const formIsValid = useMemo(() => {
    const isValid =
      registrationTypeEnumId !== undefined &&
      phoneNumber !== "" &&
      foundedAt !== undefined &&
      divisionId !== undefined &&
      activityFieldKr !== "" &&
      activityFieldEn !== "" &&
      divisionConsistency !== "" &&
      foundationPurpose !== "" &&
      activityPlan !== "";

    if (registrationTypeEnumId === RegistrationTypeEnum.Renewal) {
      return isValid;
    }

    if (registrationTypeEnumId === RegistrationTypeEnum.Promotional) {
      return (
        isValid &&
        activityPlanFileId !== undefined &&
        clubRuleFileId !== undefined
      );
    }

    if (isProvisional(registrationTypeEnumId)) {
      return isValid && activityPlanFileId !== undefined;
    }

    return false;
  }, [
    registrationTypeEnumId,
    phoneNumber,
    foundedAt,
    divisionId,
    activityFieldKr,
    activityFieldEn,
    divisionConsistency,
    foundationPurpose,
    activityPlan,
    activityPlanFileId,
    clubRuleFileId,
  ]);

  const errorMessage = useMemo(
    () =>
      computeErrorMessage({
        registrationTypeEnumId,
        phoneNumber,
        activityFieldKr,
        activityFieldEn,
        foundedAt,
        divisionId,
        divisionConsistency,
        foundationPurpose,
        activityPlan,
        activityPlanFileId,
        clubRuleFileId,
        isAgreed,
      }),
    [
      registrationTypeEnumId,
      phoneNumber,
      activityFieldKr,
      activityFieldEn,
      foundedAt,
      divisionId,
      divisionConsistency,
      foundationPurpose,
      activityPlan,
      activityPlanFileId,
      clubRuleFileId,
      isAgreed,
    ],
  );

  const { mutate, isSuccess } = usePutClubRegistration();

  const title = useMemo(() => {
    switch (detail?.registrationTypeEnumId) {
      case RegistrationTypeEnum.Promotional:
        return "신규 등록";
      case RegistrationTypeEnum.Renewal:
        return "재등록";
      default:
        return "가등록";
    }
  }, [detail]);

  const type =
    detail?.registrationTypeEnumId ?? RegistrationTypeEnum.NewProvisional;

  const isProvisionalClub =
    type === RegistrationTypeEnum.NewProvisional ||
    type === RegistrationTypeEnum.ReProvisional;

  const submitHandler = useCallback(
    (data: ApiReg009RequestBody) => {
      // console.log("debug", data);
      mutate({ requestParam: { applyId }, body: data });
    },
    [mutate, applyId],
  );

  useEffect(() => {
    if (isSuccess) {
      router.replace(`/my/register-club/${applyId}`);
      queryClient.invalidateQueries({
        queryKey: [apiReg011.url(applyId.toString())],
      });
    }
  }, [isSuccess, router, applyId, queryClient]);

  if (!detail) return null;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FormProvider {...formCtx}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <FlexWrapper direction="column" gap={60}>
            <PageHead
              items={[
                {
                  name: `마이페이지`,
                  path: `/my`,
                },
                {
                  name: `동아리 등록`,
                  path: `/my/register-club/${applyId}`,
                },
              ]}
              title={`동아리 ${title} 신청 수정`}
              enableLast
            />
            <FlexWrapper direction="column" gap={20}>
              <AsyncBoundary isLoading={isLoadingTerm} isError={isErrorTerm}>
                {/* TODO: 학기 동적처리  */}
                <Info
                  text={`현재는 2024년 가을학기 동아리 등록 기간입니다 (신청 마감 : ${formatDateTime(clubRegistrationPeriodEnd)})`}
                />
              </AsyncBoundary>
              <WarningInfo>
                <Typography lh={24} color="BLACK">
                  동아리 등록 구분(재등록 / 신규 등록 / 가등록) 변경 또는 가등록
                  신청 구분 변경을 원할 경우, 해당 신청 내역을 삭제한 후 새로운
                  신청을 해주시기 바랍니다
                </Typography>
              </WarningInfo>
            </FlexWrapper>
            {isProvisionalClub ? (
              <ProvisionalBasicInformFrame editMode />
            ) : (
              <BasicInformFrame type={type} editMode />
            )}
            <AdvancedInformFrame
              type={type}
              formCtx={formCtx}
              files={{
                activityPlanFile: detail?.activityPlanFile,
                clubRuleFile: detail?.clubRuleFile,
                externalInstructionFile: detail?.externalInstructionFile,
              }}
            />
            {type === RegistrationTypeEnum.Promotional && clubId && (
              <ActivityReportFrame clubId={clubId} />
            )}
            <ClubRulesFrame
              isProvisional={type === RegistrationTypeEnum.NewProvisional}
              isAgreed={isAgreed}
              setIsAgreed={setIsAgreed}
            />
            <ButtonWrapper>
              <Button
                type="outlined"
                onClick={() => router.replace(`/my/register-club/${applyId}`)}
              >
                취소
              </Button>

              <FlexWrapper
                direction="row"
                gap={16}
                style={{ alignItems: "center" }}
              >
                {errorMessage && (
                  <Typography color="RED.600" fs={12} lh={16}>
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  buttonType="submit"
                  type={
                    formIsValid && isAgreed && errorMessage === ""
                      ? "default"
                      : "disabled"
                  }
                >
                  저장
                </Button>
              </FlexWrapper>
            </ButtonWrapper>
          </FlexWrapper>
        </form>
      </FormProvider>
    </AsyncBoundary>
  );
};

export default MyRegisterClubEditFrame;
