import apiSto008 from "@sparcs-clubs/interface/api/storage/endpoint/apiSto008";

import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  //   defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

import type {
  ApiSto008RequestBody,
  ApiSto008ResponseCreated,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto008";

export const usePostStorageContract = () =>
  useMutation<ApiSto008ResponseCreated, Error, { body: ApiSto008RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiSto008ResponseCreated> => {
      const { data } = await axiosClientWithAuth.post(apiSto008.url(), body);

      return apiSto008.responseBodyMap[201].parse(data);
    },
  });

// defineAxiosMock(mock => {
//   mock.onPost(apiSto008.url()).reply(() => [200, {}]);
// });
