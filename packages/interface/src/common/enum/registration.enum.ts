export enum RegistrationTypeEnum {
  Renewal = 1, // 동아리 재등록 신청
  Promotional, // 동아리 신규 등록
  Provisional, // 가동아리 등록 신청
}

export enum RegistrationStatusEnum {
  Pending = 1, // 대기중
  Approved, // 승인됨
  Rejected, // 반려됨
}

export enum RegistrationEventEnum {
  ClubRegistrationApplication = 1, // 동아리 등록 신청 기간
  ClubRegistrationModification, // 동아리 등록 검토 및 수정 기간
  StudentRegistrationApplication, // 회원 등록 신청 기간
  Finish, // 마감
}
