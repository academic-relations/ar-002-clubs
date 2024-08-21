import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiUsr001ResponseOK } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import Info from "@sparcs-clubs/web/common/components/Info";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ActivityReportFrame from "../components/ActivityReportFrame";
import AdvancedInformFrame from "../components/AdvancedInformFrame";
import BasicInformFrame from "../components/BasicInformFrame";
import ClubRulesFrame from "../components/ClubRulesFrame";
import useRegisterClub from "../services/useRegisterClub";
import { RegisterClubInterface } from "../types/registerClub";

interface RegisterClubMainFrameProps {
  type: RegistrationTypeEnum;
  profile?: ApiUsr001ResponseOK;
  clubIds?: { id: number }[];
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RegisterClubMainFrame: React.FC<RegisterClubMainFrameProps> = ({
  type,
  profile = undefined,
  clubIds = [],
}) => {
  const router = useRouter();

  const { mutate: registerClubApi, isSuccess } = useRegisterClub();

  const [isCheckedClubName, setIsCheckedClubName] = useState(false);
  const [isCheckedProfessor, setIsCheckedProfessor] = useState(
    type === RegistrationTypeEnum.Promotional,
  );

  const formCtx = useForm<RegisterClubInterface>({
    mode: "all",
    defaultValues: {
      studentId: profile?.studentNumber,
    },
  });

  const {
    getValues,
    handleSubmit,
    formState: { isValid },
  } = formCtx;

  const title = useMemo(() => {
    switch (type) {
      case RegistrationTypeEnum.Promotional:
        return "신규 등록";
      case RegistrationTypeEnum.Renewal:
        return "재등록";
      default:
        return "가등록";
    }
  }, [type]);

  const submitHandler = useCallback(
    (data: RegisterClubInterface) => {
      const isNewClubName = !(
        (type === RegistrationTypeEnum.Promotional ||
          type === RegistrationTypeEnum.Renewal) &&
        !isCheckedClubName
      );

      registerClubApi({
        body: {
          clubId: data.clubId,
          registrationTypeEnumId:
            type === RegistrationTypeEnum.NewProvisional && isCheckedClubName
              ? RegistrationTypeEnum.ReProvisional
              : type,
          clubNameKr: isNewClubName ? data.clubNameKr : "",
          clubNameEn: isNewClubName ? data.clubNameEn : "",
          studentId: data.studentId,
          phoneNumber: data.phoneNumber,
          foundedAt:
            data.foundedMonthAt != null
              ? new Date(+data.foundedYearAt, +data.foundedMonthAt! - 1)
              : new Date(data.foundedYearAt),
          divisionId: data.divisionId,
          activityFieldKr: data.activityFieldKr,
          activityFieldEn: data.activityFieldEn,
          professor:
            isCheckedProfessor && data.professor
              ? {
                  name: data.professor.name,
                  email: data.professor.email,
                  professorEnumId: data.professor.professorEnumId,
                }
              : undefined,
          divisionConsistency: data.divisionConsistency,
          foundationPurpose: data.foundationPurpose,
          activityPlan: data.activityPlan,
          activityPlanFileId: data.activityPlanFileId,
          clubRuleFileId: data.clubRuleFileId,
          externalInstructionFileId: data.externalInstructionFileId,
        },
      });
    },
    [isCheckedProfessor, isCheckedClubName, registerClubApi, type],
  );

  useEffect(() => {
    if (isSuccess) {
      overlay.open(({ isOpen, close }) => (
        <Modal isOpen={isOpen}>
          <ConfirmModalContent
            onConfirm={() => {
              close();
              // TODO. 신청내역 페이지로 이동
            }}
          >
            신청이 완료되었습니다.
            <br />
            확인을 누르면 신청 내역 화면으로 이동합니다.
          </ConfirmModalContent>
        </Modal>
      ));
    }
  }, [isSuccess]);

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
            title={`동아리 ${title} 신청`}
            enableLast
          />
          {/* TODO. 등록 기간, 신청마감 동적처리  */}
          <Info text="현재는 2024년 봄학기 동아리 등록 기간입니다 (신청 마감 : 2024년 3월 10일 23:59)" />
          <BasicInformFrame
            type={type}
            clubIds={clubIds}
            profile={{
              name: profile?.name ?? "",
              phoneNumber: profile?.phoneNumber,
            }}
            onCheckedClubName={data => setIsCheckedClubName(data)}
            onCheckProfessor={data => setIsCheckedProfessor(data)}
          />
          <AdvancedInformFrame type={type} />
          {type !== RegistrationTypeEnum.Renewal && <ActivityReportFrame />}
          <ClubRulesFrame
            isProvisional={type === RegistrationTypeEnum.NewProvisional}
          />
          <ButtonWrapper>
            <Button
              type="outlined"
              onClick={() => router.replace("/register-club")}
            >
              취소
            </Button>
            <Button
              buttonType="submit"
              type={isValid && getValues().isAgreed ? "default" : "disabled"}
            >
              신청
            </Button>
          </ButtonWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default RegisterClubMainFrame;
