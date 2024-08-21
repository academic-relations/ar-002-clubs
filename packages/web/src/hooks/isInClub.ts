/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useGetMyClub } from "../features/clubDetails/services/getMyClub";

export const useIsInClub = (
  clubId: number,
  isRegisteringPeriod: boolean,
): [RegistrationApplicationStudentStatusEnum, boolean] => {
  const { data, isLoading } = useGetMyClub();

  if (isRegisteringPeriod) {
    // 동아리에 신청하지 않았을 때도 Rejected로 return
    const isInClub = React.useMemo(() => {
      if (data) {
        const matchingApply = data.applies.find(
          (apply: { clubId: number }) => apply.clubId === clubId,
        );
        if (matchingApply) {
          return matchingApply.applyStatusEnumId;
        }
        return RegistrationApplicationStudentStatusEnum.Rejected;
      }
      return RegistrationApplicationStudentStatusEnum.Rejected;
    }, [data, clubId]);
    return [isInClub, isLoading];
  }

  return [RegistrationApplicationStudentStatusEnum.Rejected, false];
};
