import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import React, { useCallback, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import {
  getDisplayNameRegistration,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Info from "@sparcs-clubs/web/common/components/Info";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import useGetSemesterNow from "@sparcs-clubs/web/utils/getSemesterNow";

import ActivityReportFrame from "../components/ActivityReportFrame";
import AdvancedInformFrame from "../components/advanced-info/AdvancedInformFrame";
import BasicInformFrame from "../components/basic-info/BasicInformFrame";
import ProvisionalBasicInformFrame from "../components/basic-info/ProvisionalBasicInformFrame";
import ClubRulesFrame from "../components/ClubRulesFrame";
import { registerClubDeadlineInfoText } from "../constants";
import useRegisterClub from "../services/useRegisterClub";
import { RegisterClubModel } from "../types/registerClub";
import computeErrorMessage from "../utils/computeErrorMessage";
import { isProvisional } from "../utils/registrationType";

interface RegisterClubMainFrameProps {
  type: RegistrationTypeEnum;
  deadline: Date | null;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RegisterClubMainFrame: React.FC<RegisterClubMainFrameProps> = ({
  type,
  deadline = undefined,
}) => {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetUserProfile();

  const formCtx = useForm<RegisterClubModel>({
    mode: "all",
    defaultValues: {
      registrationTypeEnumId: type,
      phoneNumber: profile?.phoneNumber,
    },
  });

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
  const activityPlanFile = watch("activityPlanFile");
  const clubRuleFile = watch("clubRuleFile");
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

    if (type === RegistrationTypeEnum.Renewal) {
      return isValid;
    }

    if (registrationTypeEnumId === RegistrationTypeEnum.Promotional) {
      return (
        isValid && activityPlanFile !== undefined && clubRuleFile !== undefined
      );
    }

    if (isProvisional(registrationTypeEnumId)) {
      return isValid && activityPlanFile !== undefined;
    }

    return false;
  }, [
    type,
    registrationTypeEnumId,
    phoneNumber,
    foundedAt,
    divisionId,
    activityFieldKr,
    activityFieldEn,
    divisionConsistency,
    foundationPurpose,
    activityPlan,
    activityPlanFile,
    clubRuleFile,
  ]);

  const errorMessage = useMemo(
    () =>
      computeErrorMessage({
        registrationTypeEnumId: type,
        phoneNumber,
        activityFieldKr,
        activityFieldEn,
        foundedAt,
        divisionId,
        divisionConsistency,
        foundationPurpose,
        activityPlan,
        activityPlanFile,
        clubRuleFile,
        isAgreed,
      }),
    [
      type,
      phoneNumber,
      activityFieldKr,
      activityFieldEn,
      foundedAt,
      divisionId,
      divisionConsistency,
      foundationPurpose,
      activityPlan,
      activityPlanFile,
      clubRuleFile,
      isAgreed,
    ],
  );

  const { data: registrationData, mutate: registerClubApi } = useRegisterClub();

  const {
    semester: semesterInfo,
    isLoading: semesterLoading,
    isError: semesterError,
  } = useGetSemesterNow();

  const isProvisionalClub =
    type === RegistrationTypeEnum.NewProvisional ||
    type === RegistrationTypeEnum.ReProvisional;

  const submitHandler = useCallback(
    (data: RegisterClubModel) => {
      // logger.debug("submit", data);
      registerClubApi(
        {
          body: {
            ...data,
            clubRuleFileId: data.clubRuleFile?.id,
            activityPlanFileId: data.activityPlanFile?.id,
            externalInstructionFileId: data.externalInstructionFile?.id,
          },
        },
        {
          onSuccess: () => {
            overlay.open(({ isOpen, close }) => (
              <Modal isOpen={isOpen}>
                <ConfirmModalContent
                  onConfirm={() => {
                    close();
                    router.push(`/my/register-club/${registrationData?.id}`);
                  }}
                >
                  신청이 완료되었습니다.
                  <br />
                  확인을 누르면 신청 내역 화면으로 이동합니다.
                </ConfirmModalContent>
              </Modal>
            ));
          },
          onError: () => {
            /* 
              TODO: (@dora)
              원래 useGetClubDetail()을 통해 clubName을 가져와서 
              "{clubName} 동아리 등록 신청이 이미 존재하여 등록 신청을 할 수 없습니다."라고 표시해주었는데,
              해당 API 호출에 이슈가 있어서 clubName에 대한 부분을 임시로 빼둔 상태
              그리고 에러 케이스가 다양해지면서 그냥 문구를 퉁쳐버림...
            */
            overlay.open(({ isOpen, close }) => (
              <Modal isOpen={isOpen}>
                <ConfirmModalContent
                  onConfirm={() => {
                    close();
                  }}
                >
                  해당 동아리에 대한 등록 신청이 이미 존재하거나,
                  <br />
                  이미 등록 신청 기록이 있거나,
                  <br />
                  지도교수를 입력하지 않아
                  <br />
                  등록 신청을 할 수 없습니다.
                </ConfirmModalContent>
              </Modal>
            ));
          },
        },
      );
    },
    [registerClubApi],
  );

  return (
    <FormProvider {...formCtx}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FlexWrapper direction="column" gap={60}>
          <PageHead
            items={[
              {
                name: `동아리 등록`,
                path: `/register-club`,
              },
            ]}
            title={`동아리 ${getDisplayNameRegistration(type)} 신청`}
            enableLast
          />
          <AsyncBoundary isLoading={semesterLoading} isError={semesterError}>
            {deadline ? (
              <Info
                text={registerClubDeadlineInfoText(deadline, semesterInfo)}
              />
            ) : (
              <Info text="현재는 동아리 등록 기간이 아닙니다" />
            )}
          </AsyncBoundary>
          <AsyncBoundary isLoading={isLoadingProfile} isError={isErrorProfile}>
            {isProvisionalClub ? (
              <ProvisionalBasicInformFrame profile={profile} />
            ) : (
              <BasicInformFrame type={type} profile={profile} />
            )}
          </AsyncBoundary>
          <AdvancedInformFrame type={type} />
          {type === RegistrationTypeEnum.Promotional && clubId && (
            <ActivityReportFrame clubId={clubId} />
          )}
          <ClubRulesFrame
            isNewProvisional={type === RegistrationTypeEnum.NewProvisional}
            isAgreed={isAgreed}
            setIsAgreed={setIsAgreed}
          />

          <ButtonWrapper>
            <Button
              type="outlined"
              onClick={() => router.replace("/register-club")}
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
                신청
              </Button>
            </FlexWrapper>
          </ButtonWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default RegisterClubMainFrame;
