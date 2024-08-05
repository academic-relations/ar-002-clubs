import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

export interface RegisterClubInterface extends ApiReg001RequestBody {
  foundedMonthAt?: string;
  foundedYearAt: string;
  isAgreed: boolean;
}
