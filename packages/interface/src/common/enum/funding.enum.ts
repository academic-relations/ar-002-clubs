export enum FundingOrderStatusEnum {
  Applied = 1, // 제출
  Approved, // 승인
  Rejected, // 반려
  Commitee, // 운위
}

export enum FundingDeadlineEnum {
  Activity = 1, // 활동
  Writing, // 작성
  Revision, // 수정
  Review, // 검토
  Exception, // 예외
}

export enum FixtureEvidenceEnum {
  Purchase = 1, // 구매
  Management, // 관리
}

export enum FixtureClassEnum {
  Electronics = 1, // 전자기기
  Furniture, // 가구
  MusicalInstruments, // 악기
  Software, // 소프트웨어
  Others, // 기타
}

export enum TransportationEnum {
  CityBus = 1, // 시내/마을버스
  IntercityBus, // 고속/시외버스
  Rail, // 철도
  Taxi, // 택시
  CharterBus, // 전세버스
  Cargo, // 화물 운반
  CallVan, // 콜밴
  Airplane, // 비행기
  Ship, // 선박
  Others, // 기타
}
