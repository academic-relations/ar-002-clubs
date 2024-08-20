import apiFil002, {
  ApiFil002RequestBody,
  ApiFil002ResponseOk,
} from "@sparcs-clubs/interface/api/file/endpoint/apiFil002";
import { useQuery } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
  UnexpectedAPIResponseError,
} from "@sparcs-clubs/web/lib/axios";

const useFileMetadata = (body: ApiFil002RequestBody) =>
  useQuery<ApiFil002ResponseOk, Error>({
    queryKey: ["fileMetadata", body],
    queryFn: async (): Promise<ApiFil002ResponseOk> => {
      const { data, status } = await axiosClientWithAuth.post(apiFil002.url(), {
        files: body.files,
      });

      switch (status) {
        case 200:
          return apiFil002.responseBodyMap[200].parse(data);
        default:
          throw new UnexpectedAPIResponseError();
      }
    },
    enabled: body.files.length > 0,
  });

export default useFileMetadata;

defineAxiosMock(mock => {
  mock.onGet(apiFil002.url()).reply(() => [
    200,
    {
      metadata: [
        {
          name: "sample-file.txt",
          size: 1024,
        },
      ],
    },
  ]);
});
