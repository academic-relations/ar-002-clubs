import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { RegistrationEventEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { RegistrationRepository } from "../repository/registration.repository";

@Injectable()
export default class RegistrationPublicService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  async checkDeadline(param: { enums: Array<RegistrationEventEnum> }) {
    const today = getKSTDate();
    const todayDeadline = await this.registrationRepository
      .selectDeadlineByDate(today)
      .then(arr => {
        if (arr.length === 0)
          throw new HttpException(
            "Today is not in the range of deadline",
            HttpStatus.BAD_REQUEST,
          );
        return arr[0];
      });
    if (
      param.enums.find(
        e => Number(e) === todayDeadline.registrationDeadlineEnumId,
      ) === undefined
    )
      throw new HttpException(
        "Today is not a day for activity deletion",
        HttpStatus.BAD_REQUEST,
      );
  }
}
