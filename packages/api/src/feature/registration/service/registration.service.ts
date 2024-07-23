import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import logger from "@sparcs-clubs/api/common/util/logger";

import { RegistrationRepository } from "../repository/registration.repository";

import type {
  ApiReg001RequestBody,
  ApiReg001ResponseCreated,
} from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async postRegistration(
    body: ApiReg001RequestBody,
  ): Promise<ApiReg001ResponseCreated> {
    // clubId가 유효한지 확인
    if (body.clubId) {
      const clubList = await this.registrationRepository.findByClubId(
        body.clubId,
      );

      if (clubList.length !== 1) {
        throw new HttpException(
          "[postRegistration] invalid clubId",
          HttpStatus.BAD_REQUEST,
        );
      }
      logger.debug("[postRegistration] club existence checked");
    }

    // 기타 필요한 유효성 검사 수행
    // ...

    // 등록 신청 저장
    await this.registrationRepository.createRegistration(body);

    return {};
  }
}
