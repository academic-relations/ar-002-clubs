import type { ApiUsr001ResponseOK } from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";

const mockupUserProfile: ApiUsr001ResponseOK = {
  name: "넙죽이",
  studentNumber: 23456789,
  clubs: [
    { id: 1, name: "술박스" },
    { id: 2, name: "동연" },
    { id: 3, name: "총학" },
  ],
  email: "clubsfighting@sparcs.org",
  department: "SoC",
  phoneNumber: "010-1234-8765",
};

export default mockupUserProfile;
