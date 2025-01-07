import { IStudent } from "@sparcs-clubs/interface/api/user/entity";

export class MStudent implements IStudent {
  id: number;

  userId: number;

  studentNumber: number;

  name: string;

  email: string;

  phoneNumber: string;

  constructor(student: IStudent) {
    Object.assign(this, student);
  }
}
