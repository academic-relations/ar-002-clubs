enum PromotionalPrintingOrderStatusEnum {
  Applied = 1, // 신청
  Approved, // 승인
  Printed, // 출력완료
  Received, // 수령
}

enum PromotionalPrintingSizeEnum {
  A4 = 1,
  A3,
}

export { PromotionalPrintingOrderStatusEnum, PromotionalPrintingSizeEnum };
