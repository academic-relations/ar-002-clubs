import apiMee004, {
  ApiMee004RequestParam,
  ApiMee004ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee004";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useDeleteMeeting = () =>
  useMutation<ApiMee004ResponseOk, Error, { param: ApiMee004RequestParam }>({
    mutationFn: async ({ param }): Promise<ApiMee004ResponseOk> => {
      const { status } = await axiosClientWithAuth.delete(
        apiMee004.url(param.announcementId),
      );

      switch (status) {
        case 200:
          return apiMee004.responseBodyMap[200];
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useDeleteMeeting;

defineAxiosMock(mock => {
  mock.onDelete(apiMee004.url(1)).reply(() => [200]);
});