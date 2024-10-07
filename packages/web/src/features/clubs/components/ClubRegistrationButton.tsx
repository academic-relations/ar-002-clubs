"use client";

import React from "react";

import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";
import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import { useRegisterClub } from "@sparcs-clubs/web/features/clubDetails/services/registerClub";
import { useUnregisterClub } from "@sparcs-clubs/web/features/clubDetails/services/unregisterClub";

interface ClubRegistrationButtonProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
  isMobile?: boolean;
  isRegistered: boolean;
  isInClub: boolean;
  refetch: () => void;
  myRegistrationList: ApiReg006ResponseOk;
}
const ClubRegistrationButton: React.FC<ClubRegistrationButtonProps> = ({
  club,
  isMobile = false,
  isRegistered,
  isInClub,
  refetch,
  myRegistrationList,
}) => {
  const ToggleRegistered = async (close: () => void) => {
    await useRegisterClub(club.id);
    await refetch();
    close();
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

  const handleRegister = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        {isRegistered ? (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              ToggleUnregistered(close);
            }}
          >
            2024학년도 봄학기
            <ResponsiveBr /> {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name_kr}의
            <br />
            회원 등록을 취소합니다.
          </CancellableModalContent>
        ) : (
          <CancellableModalContent
            onClose={close}
            onConfirm={() => {
              ToggleRegistered(close);
            }}
          >
            2024학년도 봄학기
            <ResponsiveBr /> {club.type === 1 ? "정동아리" : "가동아리"}{" "}
            {club.name_kr}의
            <br />
            회원 등록 신청을 진행합니다.
          </CancellableModalContent>
        )}
      </Modal>
    ));
  };
  return isInClub ? (
    <TextButton text="승인 완료" disabled fs={isMobile ? 14 : 16} />
  ) : (
    <TextButton
      text={isRegistered ? "신청 취소" : "등록 신청"}
      onClick={handleRegister}
      fs={isMobile ? 14 : 16}
    />
  );
};

export default ClubRegistrationButton;
