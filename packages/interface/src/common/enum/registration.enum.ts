enum RegistrationTypeEnum {
  Renewal = 1, // 동아리 재등록 신청
  Promotional, // 동아리 신규 등록
  NewProvisional, // 가동아리 신규 등록 신청
  ReProvisional, // 가동아리 재등록 신청
}

export enum RegistrationStatusEnum {
  Pending = 1, // 대기중
  Approved, // 승인됨
  Rejected, // 반려됨
}

export enum RegistrationDeadlineEnum {
  ClubRegistrationApplication = 1, // 동아리 등록 신청 기간, 동연 요청으로 이 기간에 동아리 등롯 신청 생성/검토/수정/승인을 전부 진행합니다.
  // ClubRegistrationExecutiveFeedback, // 동아리 등록 신청들에 대해 집행부원이 검토하고 피드백하는 기간
  // ClubRegistrationModification, // 동아리 등록 신청들을 집행부원이 추가 검수하고, 코멘트에 대해 신청자가 수정하는 기간
  StudentRegistrationApplication, // 회원 등록 신청 기간
  Finish, // 마감
}

export enum RegistrationApplicationStudentStatusEnum {
  Pending = 1, // 대기중
  Approved, // 승인됨
  Rejected, // 반려됨
}

export const getDisplayNameRegistration = (
  type: RegistrationTypeEnum | undefined,
) => {
  switch (type) {
    case RegistrationTypeEnum.Renewal:
      return "재등록";
    case RegistrationTypeEnum.Promotional:
      return "신규 등록";
    case RegistrationTypeEnum.NewProvisional:
    case RegistrationTypeEnum.ReProvisional:
      return "가등록";
    default:
      return "";
  }
};

export const getEnumRegistration = (string: string) => {
  switch (string) {
    case "재등록":
      return [1];
    case "신규 등록":
      return [2];
    case "가등록":
      return [3, 4];
    default:
      return 0;
  }
};

export { RegistrationTypeEnum };
