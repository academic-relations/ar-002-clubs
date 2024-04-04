import { ClubInfo, RawClubsData, fromObj } from "./clubs.types";

interface MyClubsRawData {
  semester: number;
  name: string;
  clubs: Array<RawClubsData>;
}

interface MyClubsInfo {
  semester: number;
  name: string;
  clubs: Array<ClubInfo>;
}

const fromMyClubsObj = (myClubsObj: MyClubsRawData) => {
  const myClubs: MyClubsInfo = {
    semester: myClubsObj.semester,
    name: myClubsObj.name,
    clubs: myClubsObj.clubs.map(club => fromObj(club)),
  };

  return myClubs;
};

export type { MyClubsInfo };
export { fromMyClubsObj };
