/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";

import { RegistrationStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useGetMyClub } from "../features/clubDetails/services/getMyClub";

export const useIsInClub = (
  clubId: number,
  isRegisteringPeriod: boolean,
): [RegistrationStatusEnum, boolean] => {
  if (isRegisteringPeriod) {
    console.log(isRegisteringPeriod);
    const { data, isLoading } = useGetMyClub();

    // 동아리에 신청하지 않았을 때도 Rejected로 return
    const isInClub = React.useMemo(() => {
      if (data) {
        const matchingApply = data.applies.find(
          (apply: { clubId: number }) => apply.clubId === clubId,
        );
        if (matchingApply) {
          return matchingApply.applyStatusEnumId;
        }
        return RegistrationStatusEnum.Rejected;
      }
      return RegistrationStatusEnum.Rejected;
    }, [data, clubId]);
    return [isInClub, isLoading];
  }

  return [RegistrationStatusEnum.Rejected, false];
};
