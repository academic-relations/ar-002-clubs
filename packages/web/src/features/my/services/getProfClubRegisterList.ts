"use client";

import apiReg021, {
  ApiReg021ResponseOk,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg021";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockProfClubRegister } from "./_mock/mockMyRegister";

const useProfClubRegisterList = () =>
  useQuery<ApiReg021ResponseOk, Error>({
    queryKey: [apiReg021.url()],
    queryFn: async (): Promise<ApiReg021ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg021.url(),
        {},
      );

      switch (status) {
        case 200:
        case 304:
          return data;
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useProfClubRegisterList;

defineAxiosMock(mock => {
  mock.onGet(apiReg021.url()).reply(() => [200, mockProfClubRegister]);
});
