import { IExecutive } from "@sparcs-clubs/interface/api/user/type/user.type";

export class MExecutive implements IExecutive {
  id: number;

  userId: number;

  studentNumber: string;

  name: string;

  email: string;

  phoneNumber: string;

  constructor(executive: IExecutive) {
    Object.assign(this, executive);
  }
}
