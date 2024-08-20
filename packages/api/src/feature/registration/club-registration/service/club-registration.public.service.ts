import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { RegistrationDeadlineEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { ClubRegistrationRepository } from "../repository/club-registration.repository";

@Injectable()
export class ClubRegistrationPublicService {
  constructor(
    private readonly clubRegistrationRepository: ClubRegistrationRepository,
  ) {}

  /**
   * @param RegistrationEventEnum의 배열의 객체
   * @returns void
   * @description 오늘 날짜가 enums배열에 존재하는 이벤트의 마감일에 속하는지 확인합니다.
   */
  async checkDeadline(param: { enums: Array<RegistrationDeadlineEnum> }) {
    const today = getKSTDate();
    await this.clubRegistrationRepository
      .selectDeadlineByDate(today, param.enums)
      .then(arr => {
        if (arr.length === 0)
          throw new HttpException(
            "Today is not in the range of deadline",
            HttpStatus.BAD_REQUEST,
          );
        return arr[0];
      });
  }
}
