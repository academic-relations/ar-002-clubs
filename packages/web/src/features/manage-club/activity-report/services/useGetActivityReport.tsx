import apiAct002 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

type ISuccessResponseType = z.infer<(typeof apiAct002.responseBodyMap)[200]>;
export const useGetActivityReport = (activityId: number) =>
  useQuery<ISuccessResponseType, Error>({
    queryKey: [apiAct002.url(activityId)],
    queryFn: async (): Promise<ISuccessResponseType> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiAct002.url(activityId),
        {},
      );

      switch (status) {
        case 200:
          return apiAct002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

defineAxiosMock(mock => {
  mock.onGet(apiAct002.url(1)).reply(() => {
    const dummy: z.infer<(typeof apiAct002.responseBodyMap)[200]> = {
      clubId: 1,
      originalName: "Original Activity Name",
      name: "Activity Name",
      activityTypeEnumId: 1,
      durations: [
        {
          startTerm: new Date(),
          endTerm: new Date(),
        },
      ],
      location: "Activity Location",
      purpose: "Activity Purpose",
      detail: "Activity Detail",
      evidence: "Activity Evidence",
      evidenceFiles: [
        {
          fileId: "file-uuid",
        },
      ],
      participants: [
        {
          studentId: 20200515,
          studnetNumber: 20200515,
          name: "이지윤",
        },
        {
          studentId: 20200513,
          studnetNumber: 20200513,
          name: "박병찬",
        },
        {
          studentId: 20230512,
          studnetNumber: 20230512,
          name: "이도라",
        },
      ],
    };
    return [200, dummy];
  });
});
