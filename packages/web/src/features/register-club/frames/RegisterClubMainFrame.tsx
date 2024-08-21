import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
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
import ProvisionalBasicInformFrame from "../components/ProvisionalBasicInformFrame";
import useRegisterClub from "../services/useRegisterClub";

interface RegisterClubMainFrameProps {
  type: RegistrationTypeEnum;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RegisterClubMainFrame: React.FC<RegisterClubMainFrameProps> = ({
  type,
}) => {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  const { mutate: registerClubApi, isSuccess } = useRegisterClub();

  const formCtx = useForm<ApiReg001RequestBody>({
    mode: "all",
  });

  const {
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

  const isProvisionalClub =
    type === RegistrationTypeEnum.NewProvisional ||
    type === RegistrationTypeEnum.ReProvisional;

  const submitHandler = useCallback(
    (data: ApiReg001RequestBody) => {
      registerClubApi({
        body: data,
      });
    },
    [registerClubApi],
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
          {isProvisionalClub ? (
            <ProvisionalBasicInformFrame />
          ) : (
            <BasicInformFrame type={type} />
          )}
          <AdvancedInformFrame type={type} />
          {type === RegistrationTypeEnum.Promotional && <ActivityReportFrame />}
          <ClubRulesFrame
            isProvisional={type === RegistrationTypeEnum.NewProvisional}
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
            <Button
              buttonType="submit"
              type={isValid && isAgreed ? "default" : "disabled"}
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
