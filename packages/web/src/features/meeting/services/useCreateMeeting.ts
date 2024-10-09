import apiMee001, {
  ApiMee001RequestBody,
  ApiMee001ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee001";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useCreateMeeting = () =>
  useMutation<ApiMee001ResponseCreated, Error, { body: ApiMee001RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiMee001ResponseCreated> => {
      const { data, status } = await axiosClientWithAuth.post(
        apiMee001.url(),
        body,
      );

      switch (status) {
        case 201:
          return apiMee001.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useCreateMeeting;

defineAxiosMock(mock => {
  mock.onPost(apiMee001.url()).reply(() => [201, {}]);
});
