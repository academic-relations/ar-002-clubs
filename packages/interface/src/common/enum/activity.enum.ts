export enum ActivityTypeEnum {
  matchedInternalActivity = 1,
  matchedExternalActivity,
  notMatchedActivity,
}

export enum ActivityStatusEnum {
  Applied = 1, // 신청
  Approved, // 승인
  Rejected, // 반려
}

export enum ActivityDeadlineEnum {
  Activity = 1, // 활동
  Upload, // 작성
  Modification, // 수정
  Exceptional, // 예외
}
