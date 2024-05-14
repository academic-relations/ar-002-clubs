// 물품대여신청에 대하 처리 상태를 표현하기 위한 열거형입니다.
enum RentalOrderStatusEnum {
  Applied, // 신청
  Approved, // 승인
  Rented, // 대여
  Returned, // 반납
}

export { RentalOrderStatusEnum };
