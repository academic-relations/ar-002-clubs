import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { RegistrationEventEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { RegistrationRepository } from "../repository/registration.repository";

@Injectable()
export default class RegistrationPublicService {
  constructor(
    private readonly registrationRepository: RegistrationRepository,
  ) {}

  /**
   * @param param 등록 이벤트의 Enum 배열을 포함하는 객체
   * @throws HttpException 오늘 날짜가 마감일 범위에 포함되지 않거나,
   *         오늘이 활동 삭제에 해당하는 날짜가 아닌 경우 발생
   *
   * 오늘 날짜와 일치하는 마감일 정보를 데이터베이스에서 조회한 후,
   * 주어진 Enum 배열에 해당하는 등록 이벤트가 오늘의 마감일과 일치하는지 확인합니다.
   *
   * 만약 오늘 날짜에 해당하는 마감일 정보가 없을 경우 예외를 발생시킵니다.
   * 또한, 주어진 Enum 배열 중에서 오늘 날짜의 마감일과 일치하는 항목이 없을 경우에도 예외를 발생시킵니다.
   */
  async checkDeadline(param: { enums: Array<RegistrationEventEnum> }) {
    // 오늘 날짜를 한국 표준시(KST)로 가져옵니다.
    const today = getKSTDate();
    // 오늘 날짜와 일치하는 마감일 정보를 데이터베이스에서 조회합니다.
    const todayDeadline = await this.registrationRepository
      .selectDeadlineByDate(today)
      .then(arr => {
        // 만약 조회된 마감일 정보가 없다면 예외를 발생시킵니다.
        if (arr.length === 0)
          throw new HttpException(
            "Today is not in the range of deadline",
            HttpStatus.BAD_REQUEST,
          );
        // 조회된 마감일 정보 중 첫 번째 항목을 반환합니다.
        return arr[0];
      });
    // 주어진 Enum 배열에서 오늘의 마감일 Enum ID와 일치하는 항목이 있는지 확인합니다.
    if (
      param.enums.find(
        e => Number(e) === todayDeadline.registrationDeadlineEnumId,
      ) === undefined
    )
      // 일치하는 항목이 없다면 예외를 발생시킵니다.
      throw new HttpException(
        "Today is not a day for activity deletion",
        HttpStatus.BAD_REQUEST,
      );
  }
}
