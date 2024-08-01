import React, { useMemo } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { overlay } from "overlay-kit";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import Info from "@sparcs-clubs/web/common/components/Info";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import AdvancedInformFrame from "../components/AdvancedInformFrame";
import BasicInformFrame from "../components/BasicInformFrame";
import ClubRulesFrame from "../components/ClubRulesFrame";
import registerClub from "../service/registerClub";
import { RegisterClubInterface } from "../types/registerClub";

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
  const formCtx = useForm<RegisterClubInterface>({ mode: "all" });

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

  const submitHandler = async (data: ApiReg001RequestBody) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            // TODO. studentId, clubId,  추가
            registerClub({
              ...data,
              registrationTypeEnumId: type,
              foundedAt:
                getValues().foundedMonthAt != null
                  ? new Date(
                      +getValues().foundedYearAt,
                      +getValues().foundedMonthAt! - 1,
                    )
                  : new Date(getValues().foundedYearAt),
            });

            close();
          }}
          onClose={close}
        >
          신청이 완료되었습니다.
          <br />
          확인을 누르면 신청 내역 화면으로 이동합니다.
        </CancellableModalContent>
      </Modal>
    ));
  };

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
          <BasicInformFrame type={type} />
          <AdvancedInformFrame type={type} />
          <ClubRulesFrame
            isProvisional={type === RegistrationTypeEnum.Provisional}
          />
          <ButtonWrapper>
            <Button
              type="outlined"
              onClick={() => {
                // TODO. 취소 로직 추가
              }}
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
