export interface IClubs {
  divisionId: number;
  divisionName: string;
  clubs: {
    clubId: number;
    clubName: string;
    clubType: number;
    isPermanent: boolean;
    characteristic: string;
    representative: string;
    advisor: string;
    totalMemberCnt: number;
  }[];
}
