import apiMee002, {
  ApiMee002ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee002";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

import { mockupMeetingDetail } from "./_mock/mockupMeetingDetail";

const useGetMeetingDetail = (id: number) =>
  useQuery<ApiMee002ResponseOk, Error>({
    queryKey: [apiMee002.url(id)],
    queryFn: async (): Promise<ApiMee002ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.get(
        apiMee002.url(id),
        {},
      );

      switch (status) {
        case 200:
          return apiMee002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useGetMeetingDetail;

defineAxiosMock(mock => {
  mock.onGet(apiMee002.url(1)).reply(() => [200, mockupMeetingDetail]);
});
