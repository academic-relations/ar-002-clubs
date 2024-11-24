import apiSto001, {
  ApiSto001RequestBody,
  ApiSto001ResponseCreated,
} from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

const useCreateStorage = () =>
  useMutation<ApiSto001ResponseCreated, Error, { body: ApiSto001RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiSto001ResponseCreated> => {
      const { data } = await axiosClientWithAuth.post(apiSto001.url(), body);

      return apiSto001.responseBodyMap[201].parse(data);
    },
  });

export default useCreateStorage;

defineAxiosMock(mock => {
  mock.onPatch(apiSto001.url()).reply(() => [201, {}]);
});
