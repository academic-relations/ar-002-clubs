import React from "react";

import apiReg006 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockupRegistraion from "./_mock/mockupRegistraion";

import type { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

export const useGetMyClub = () =>
  useQuery<ApiReg006ResponseOk, Error>({
    queryKey: [apiReg006.url()],

    queryFn: async (): Promise<ApiReg006ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg006.url(),
        {},
      );
      switch (status) {
        case 200:
          return apiReg006.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg006.url()).reply(() => [200, mockupRegistraion]);
});

export const useIsInClub = (club_id: number): [number, boolean] => {
  const { data, isLoading } = useGetMyClub();

  const isInClub = React.useMemo(() => {
    if (data) {
      const matchingApply = data.applies.find(
        (apply: { clubId: number }) => apply.clubId === club_id,
      );
      if (matchingApply) {
        return matchingApply.applyStatusEnumId;
      }
      return 0;
    }
    return 0;
  }, [data, club_id]);

  return [isInClub, isLoading];
};
