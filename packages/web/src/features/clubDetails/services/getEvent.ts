/* eslint-disable import/order */

import { z } from "zod";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupEvents } from "./_mock/mockupEvent";

import apiReg004 from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import type { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import { useQuery } from "@tanstack/react-query";

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
  mock.onGet(apiReg004.url()).reply(() => {
    const dummy: z.infer<(typeof apiReg004.responseBodyMap)[200]> =
      mockupEvents;
    return [200, dummy];
  });
});

export const checkResisteringPeriod = (): [boolean, boolean] => {
  const { data, error, isLoading } = GetEvents();

  console.log(data);

  if (isLoading) {
    return [false, true];
  }

  if (error) {
    console.error("Error fetching event:", error);
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
  console.log("matching Event :");
  console.log(matchingEvent);

  if (matchingEvent?.registrationEventEnumId === 1) {
    return [true, false];
  }
  return [false, false];
};
