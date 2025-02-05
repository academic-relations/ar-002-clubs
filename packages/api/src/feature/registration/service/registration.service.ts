import { Injectable } from "@nestjs/common";

import { ApiReg004ResponseOK } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg004";

import { RegistrationRepository } from "../repository/registration.repository";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async getStudentRegistrationEvents(): Promise<ApiReg004ResponseOK> {
    const result =
      await this.registrationRepository.getStudentRegistrationEvents();
    return result;
  }
}
