const changeRepresentativeRequestText = (
  clubName: string,
  prevRepresentative: string,
  newRepresentative: string,
) =>
  `'${clubName}'의 동아리 대표자 변경이 다음과 같이 요청되었습니다 \n${prevRepresentative} -> ${newRepresentative} ('마이페이지'에서 승인 가능)`;

const changeRepresentativeRefuseText = (
  clubName: string,
  prevRepresentative: string,
  newRepresentative: string,
) =>
  `'${clubName}'의 동아리 대표자 변경 요청이 거절되었습니다 \n${prevRepresentative} -> ${newRepresentative} (거절)`;

const changeRepresentativeCancelText = (clubName: string) =>
  `'${clubName}'의 동아리 대표자 변경이 취소되었습니다`;

const myChangeRepresentativeRequestText = (
  clubName: string,
  prevRepresentative: string,
  newRepresentative: string,
) =>
  `'${clubName}'의 동아리 대표자 변경이 다음과 같이 요청되었습니다 \n${prevRepresentative} -> ${newRepresentative} (승인 전)`;

const myChangeRepresentativeFinishText = (clubName: string) =>
  `'${clubName}'의 동아리 대표자 변경이 완료되었습니다`;

const ChangeRepresentativeModalText = (
  clubName: string,
  prevRepresentative: string,
  newRepresentative: string,
) =>
  `'${clubName}'의 동아리 대표자 변경이 다음과 같이 요청되었습니다 \n${prevRepresentative} -> ${newRepresentative}`;

export {
  changeRepresentativeRequestText,
  changeRepresentativeRefuseText,
  changeRepresentativeCancelText,
  myChangeRepresentativeRequestText,
  myChangeRepresentativeFinishText,
  ChangeRepresentativeModalText,
};
