import apiMee003, {
  ApiMee003RequestBody,
  ApiMee003RequestParam,
  ApiMee003ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee003";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useUpdateMeeting = () =>
  useMutation<
    ApiMee003ResponseCreated,
    Error,
    { requestParam: ApiMee003RequestParam; body: ApiMee003RequestBody }
  >({
    mutationFn: async ({
      requestParam,
      body,
    }): Promise<ApiMee003ResponseCreated> => {
      const { data, status } = await axiosClientWithAuth.patch(
        apiMee003.url(requestParam.announcementId),
        body,
      );

      switch (status) {
        case 200:
        case 201:
          return apiMee003.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useUpdateMeeting;

defineAxiosMock(mock => {
  mock.onPatch(apiMee003.url(1)).reply(() => [201, {}]);
});
