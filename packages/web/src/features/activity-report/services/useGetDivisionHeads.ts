import { useQuery } from "@tanstack/react-query";

import apiDiv001, {
  ApiDiv001ResponseOk,
} from "@sparcs-clubs/interface/api/division/apiDiv001";

import {
  axiosClientWithAuth,
  defineAxiosMock,
} from "@sparcs-clubs/web/lib/axios";

const useGetDivisionHeads = () =>
  useQuery<ApiDiv001ResponseOk, Error>({
    queryKey: [apiDiv001.url()],
    queryFn: async (): Promise<ApiDiv001ResponseOk> => {
      const { data } = await axiosClientWithAuth.get(apiDiv001.url());

      return apiDiv001.responseBodyMap[200].parse(data);
    },
  });

export default useGetDivisionHeads;

defineAxiosMock(mock => {
  mock.onGet(apiDiv001.url()).reply(() => [
    200,
    {
      divisions: [
        { id: 1, name: "주영미", presidentStudentNumber: 20221234 },
        {
          id: 2,
          name: "하승종",
          presidentStudentNumber: 20223424,
        },
        {
          id: 3,
          name: "권혁원",
          presidentStudentNumber: 20228344,
        },
      ],
    },
  ]);
});
