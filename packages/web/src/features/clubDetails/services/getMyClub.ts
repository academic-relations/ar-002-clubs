import apiReg006 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

import { useQuery } from "@tanstack/react-query";

import { z } from "zod";

import {
  axiosClient,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import mockupRegistraion from "./_mock/mockupRegistraion";

import type { ApiReg006ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg006";

export const GetMyClub = () =>
  useQuery<ApiReg006ResponseOk, Error>({
    queryKey: [apiReg006.url()],

    queryFn: async (): Promise<ApiReg006ResponseOk> => {
      const { data, status } = await axiosClient.get(apiReg006.url(), {});
      switch (status) {
        case 200:
          return apiReg006.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg006.url()).reply(() => {
    const dummy: z.infer<(typeof apiReg006.responseBodyMap)[200]> =
      mockupRegistraion;
    return [200, dummy];
  });
});

export const useIsInClub = (club_id: number): [boolean, boolean, boolean] => {
  const { data, error, isLoading } = GetMyClub();

  if (isLoading) {
    return [false, false, true];
  }

  if (error) {
    console.error("Error fetching club data:", error);
    return [false, true, false];
  }

  if (!data) {
    return [false, false, false];
  }

  const matchingApply = data.applies.find(
    (apply: { clubId: number }) => apply.clubId === club_id,
  );

  return [!!matchingApply, false, false];
};
