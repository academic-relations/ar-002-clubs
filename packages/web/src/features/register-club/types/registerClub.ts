import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

export interface RegisterClubInterface extends ApiReg001RequestBody {
  foundedMonthAt?: string;
  foundedYearAt: string;
  isAgreed: boolean;
}

export interface ClubRegistrationInfo {
  id: number;
  clubNameKr: string;
  clubNameEn: string;
  professor?: ProfessorInfo;
}

export interface ProfessorInfo {
  name: string;
  email: string;
  professorEnumId: ProfessorEnum;
}
