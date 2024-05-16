// 공용공간을 특정 분류기준을 통해 분류해야할 경우를 대비하여 생성한 열거형입니다.
enum CommonSpaceEnum {
  NotUsed,
}

enum CommonSpaceUsageOrderStatusEnum {
  Applied, // 신청
  Used, // 사용
  Canceled, // 취소
}

export { CommonSpaceEnum, CommonSpaceUsageOrderStatusEnum };
