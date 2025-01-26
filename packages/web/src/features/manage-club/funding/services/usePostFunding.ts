import apiFnd001, {
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd001";
import { useMutation } from "@tanstack/react-query";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

const usePostFunding = () =>
  useMutation<ApiFnd001ResponseCreated, Error, { body: ApiFnd001RequestBody }>({
    mutationFn: async ({ body }): Promise<ApiFnd001ResponseCreated> => {
      const { data } = await axiosClientWithAuth.post(apiFnd001.url(), body);

      return data;
    },
  });

export default usePostFunding;

defineAxiosMock(mock => {
  mock.onPost(apiFnd001.url()).reply(() => [201, {}]);
});
