import apiFnd004, {
  ApiFnd004RequestParam,
  ApiFnd004ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd004";
import { useMutation } from "@tanstack/react-query";

import { axiosClientWithAuth } from "@sparcs-clubs/web/lib/axios";

export const useDeleteFunding = () =>
  useMutation<
    ApiFnd004ResponseOk,
    Error,
    { requestParam: ApiFnd004RequestParam }
  >({
    mutationFn: async ({ requestParam }): Promise<ApiFnd004ResponseOk> => {
      const { data } = await axiosClientWithAuth.delete(
        apiFnd004.url(requestParam.id),
        {},
      );

      return apiFnd004.responseBodyMap[200].parse(data);
    },
  });
