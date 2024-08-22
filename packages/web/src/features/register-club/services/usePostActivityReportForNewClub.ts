import apiAct007, {
  ApiAct007RequestBody,
  ApiAct007ResponseCreated,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct007";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const usePostActivityReportForNewClub = () =>
  useMutation<ApiAct007ResponseCreated, Error, { body: ApiAct007RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiAct007ResponseCreated> => {
      const { data, status } = await axiosClientWithAuth.post(
        apiAct007.url(),
        body,
      );

      switch (status) {
        case 201:
          return apiAct007.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default usePostActivityReportForNewClub;

defineAxiosMock(mock => {
  mock.onPost(apiAct007.url()).reply(() => [201, {}]);
});
