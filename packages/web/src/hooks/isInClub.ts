import React from "react";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useGetMyMemberRegistration } from "../features/clubDetails/services/getMyMemberRegistration";

export const useIsInClub = (
  clubId: number,
): [RegistrationApplicationStudentStatusEnum, boolean] => {
  const { data, isLoading } = useGetMyMemberRegistration();

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
};
