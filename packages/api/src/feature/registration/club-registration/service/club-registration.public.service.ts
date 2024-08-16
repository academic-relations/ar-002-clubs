import { Injectable } from "@nestjs/common";

import { ClubRegistrationRepository } from "../repository/club-registration.repository";

@Injectable()
export class ClubRegistrationPublicService {
  constructor(
    private readonly clubRegistrationRepository: ClubRegistrationRepository,
  ) {}

  // 오늘이 동아리 등록 기간인지 확인합니다.
  async isClubRegistrationEvent() {
    return this.clubRegistrationRepository.isClubRegistrationEvent();
  }
}
