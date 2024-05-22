// 발급과 수령을 별개로 관리하는 것이 맞는지 확인해주세요
enum ActivityCertificateOrderStatusEnum {
  Applied, // 신청
  Approved, // 승인
  Rejected, // 반려
  Issued, // 발급
  Received, // 수령
}

export { ActivityCertificateOrderStatusEnum };
