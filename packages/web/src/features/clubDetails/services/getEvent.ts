import apiReg004 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupEvents } from "./_mock/mockupEvent";

import type { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

export const GetEvents = () =>
  useQuery<ApiReg004ResponseOK, Error>({
    queryKey: [apiReg004.url()],

    queryFn: async (): Promise<ApiReg004ResponseOK> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiReg004.url(),
        {},
      );
      switch (status) {
        case 200:
          return apiReg004.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiReg004.url()).reply(() => [200, mockupEvents]);
});

export const checkResisteringPeriod = (): [boolean, boolean] => {
  const { data, error, isLoading } = GetEvents();

  if (isLoading) {
    return [false, true];
  }

  if (error) {
    return [false, false];
  }

  if (!data) {
    return [false, false];
  }

  const currentDate = new Date();

  const matchingEvent = data.events.find(
    (event: { endTerm: Date; startTerm: Date }) =>
      currentDate <= event.endTerm && currentDate >= event.startTerm,
  );

  if (matchingEvent?.registrationEventEnumId === 1) {
    return [true, false];
  }
  return [false, false];
};
