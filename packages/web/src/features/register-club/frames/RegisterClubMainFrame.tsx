import React, { useCallback, useEffect, useMemo, useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import {
  RegistrationDeadlineEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

import Info from "@sparcs-clubs/web/common/components/Info";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { useGetRegistrationTerm } from "@sparcs-clubs/web/features/clubs/services/useGetRegistrationTerm";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

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

  const formCtx = useForm<ApiReg001RequestBody>({
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = formCtx;

  const { mutate: registerClubApi, isSuccess, isError } = useRegisterClub();

  const title = useMemo(() => {
    formCtx.setValue("registrationTypeEnumId", type);

    switch (type) {
      case RegistrationTypeEnum.Promotional:
        return "신규 등록";
      case RegistrationTypeEnum.Renewal:
        return "재등록";
      default:
        return "가등록";
    }
  }, [formCtx, type]);

  const isProvisionalClub =
    type === RegistrationTypeEnum.NewProvisional ||
    type === RegistrationTypeEnum.ReProvisional;

  const submitHandler = useCallback(
    (data: ApiReg001RequestBody) => {
      /* TODO: (@dora) remove after test */
      console.log("submit", data);
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
              /* TODO: (@dora) 신청 내역 id 받아서 넣기 */
              router.push("/my");
            }}
          >
            신청이 완료되었습니다.
            <br />
            확인을 누르면 신청 내역 화면으로 이동합니다.
          </ConfirmModalContent>
        </Modal>
      ));
      return;
    }
    if (isError) {
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
            해당 동아리에 대한 등록 신청이 이미 존재하거나
            <br />
            이미 등록 신청 기록이 있어
            <br />
            등록 신청을 할 수 없습니다.
          </ConfirmModalContent>
        </Modal>
      ));
    }
  }, [isSuccess, isError]);

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
          <AsyncBoundary isLoading={isLoadingTerm} isError={isErrorTerm}>
            {/* TODO: 학기 동적처리  */}
            <Info
              text={`현재는 2024년 가을학기 동아리 등록 기간입니다 (신청 마감 : ${formatDateTime(clubRegistrationPeriodEnd)})`}
            />
          </AsyncBoundary>
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
