import apiFil001, {
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
} from "@sparcs-clubs/interface/api/file/endpoint/apiFil001";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useFileUpload = () =>
  useMutation<ApiFil001ResponseCreated, Error, { body: ApiFil001RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiFil001ResponseCreated> => {
      const { data, status } = await axiosClientWithAuth.post(
        apiFil001.url(),
        body,
      );

      switch (status) {
        case 201:
          return apiFil001.responseBodyMap[201].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
  });

export default useFileUpload;

defineAxiosMock(mock => {
  mock.onPost(apiFil001.url()).reply(() => [
    201,
    {
      urls: [
        {
          uploadUrl: "https://example.com/upload",
          fileId: "sample-file-id",
        },
      ],
    },
  ]);
});
