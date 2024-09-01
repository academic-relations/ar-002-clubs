import type { ApiUsr001ResponseOK } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";

const mockupUserProfile: ApiUsr001ResponseOK = {
  id: 1234,
  name: "넙죽이",
  studentNumber: 23456789,
  clubs: [
    { id: 1, name_kr: "술박스", name_en: "술박스" },
    { id: 2, name_kr: "동연", name_en: "동연" },
    { id: 3, name_kr: "총학", name_en: "총학" },
  ],
  email: "clubsfighting@sparcs.org",
  department: "SoC",
  phoneNumber: "010-1234-8765",
};

export default mockupUserProfile;
