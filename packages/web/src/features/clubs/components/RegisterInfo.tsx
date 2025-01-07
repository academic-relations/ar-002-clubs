import React from "react";

import { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";
import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { overlay } from "overlay-kit";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import useGetSemesterNow from "@sparcs-clubs/web/utils/getSemesterNow";

import { useRegisterClub } from "../services/registerClub";
import { useUnregisterClub } from "../services/unregisterClub";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface RegisterInfoProps {
  club: ApiClb002ResponseOK;
  isInClub: RegistrationApplicationStudentStatusEnum;
  refetch: () => void;
  isRegistered: boolean;
  myRegistrationList: ApiReg006ResponseOk;
}
const RegisterInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex: 1 0 0;
  align-items: center;
`;

export const RegisterInfo: React.FC<RegisterInfoProps> = ({
  club,
  isInClub,
  refetch,
  isRegistered,
  myRegistrationList,
}) => {
  const ToggleRegistered = async (close: () => void) => {
    close();
    await useRegisterClub(club.id);
    await refetch();
  };

  const ToggleUnregistered = async (close: () => void) => {
    const thisRegistration = (
      myRegistrationList as {
        applies: {
          id: number;
          clubId: number;
          applyStatusEnumId: RegistrationApplicationStudentStatusEnum;
        }[];
      }
    ).applies.find(apply => apply.clubId === club.id);
    await useUnregisterClub({
      applyId: (
        thisRegistration as {
          id: number;
          clubId: number;
          applyStatusEnumId: RegistrationApplicationStudentStatusEnum;
        }
      ).id,
    });
    await refetch();
    close();
  };

  const ResponsiveBr = styled.br`
    display: none;
    @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
      display: block;
    }
  `;

  const semester = useGetSemesterNow()?.semester;

  const submitHandler = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        {isRegistered ? (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              ToggleUnregistered(close);
            }}
          >
            {semester?.year}년도 {semester?.name}학기
            <ResponsiveBr /> {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name_kr}의<br />
            회원 등록을 취소합니다.
          </CancellableModalContent>
        ) : (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              ToggleRegistered(close);
            }}
          >
            {semester?.year}년도 {semester?.name}학기
            <ResponsiveBr /> {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name_kr}의<br />
            회원 등록 신청을 진행합니다.
          </CancellableModalContent>
        )}
      </Modal>
    ));
  };
  const renderButton = () => {
    if (isInClub === RegistrationApplicationStudentStatusEnum.Pending) {
      return (
        <Button type="default" onClick={submitHandler}>
          회원 등록 취소
        </Button>
      );
    }
    if (isInClub === RegistrationApplicationStudentStatusEnum.Approved) {
      return (
        <Button type="disabled" onClick={submitHandler}>
          회장 승인 완료
        </Button>
      );
    }
    return (
      <Button type="default" onClick={submitHandler}>
        회원 등록 신청
      </Button>
    );
  };
  return (
    <RegisterInfoWrapper>
      <Typography fs={16} color="GRAY.600" fw="REGULAR">
        등록 신청 {club.totalMemberCnt}명
      </Typography>
      {renderButton()}
    </RegisterInfoWrapper>
  );
};
