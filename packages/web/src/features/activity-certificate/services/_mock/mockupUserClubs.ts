import { ApiAcf002ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf002";

const mockupUserClubs: ApiAcf002ResponseOk = {
  clubs: [
    {
      id: 1,
      name_kr: "동아리1",
      name_en: "club1",
      dateRange: [
        {
          startMonth: new Date(2024, 3, 1),
          endMonth: new Date(2024, 8, 27),
        },
        {
          startMonth: new Date(2024, 9, 2),
          endMonth: undefined,
        },
      ],
    },
  ],
};

export default mockupUserClubs;
