import {
  ManageClubActivityCertificateData,
  ManageClubActivityCertificateStatus,
  ManageClubCommonSpaceData,
  ManageClubCommonSpaceStatus,
  ManageClubPrintingBusinessData,
  ManageClubPrintingBusinessStatus,
  ManageClubRentalBusinessData,
  ManageClubRentalBusinessStatus,
} from "./ManageClubTable";

export const rentalBusinessMockData: ManageClubRentalBusinessData[] = [
  ...Array(5).fill({
    status: ManageClubRentalBusinessStatus.rent,
    submitTime: new Date("2024-03-02 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-11 00:00"),
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
  ...Array(4).fill({
    status: ManageClubRentalBusinessStatus.return,
    submitTime: new Date("2024-03-06 09:00"),
    name: "이지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-11 00:00"),
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목wdwddwdwdwddwdw",
  }),
  ...Array(3).fill({
    status: ManageClubRentalBusinessStatus.approve,
    submitTime: new Date("2024-03-04 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-10 00:00"),
    returnTime: new Date("2024-03-14 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),

  ...Array(6).fill({
    status: ManageClubRentalBusinessStatus.cancel,
    submitTime: new Date("2024-03-01 00:00"),
    name: "삼지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-13 00:00"),
    returnTime: new Date("2024-03-19 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
  ...Array(6).fill({
    status: ManageClubRentalBusinessStatus.submit,
    submitTime: new Date("2024-03-01 00:00"),
    name: "삼지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-03 00:00"),
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
];

export const printingBusinessMockData: ManageClubPrintingBusinessData[] = [
  ...Array(6).fill({
    status: ManageClubPrintingBusinessStatus.approve,
    submitTime: new Date("2024-03-02 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    receiveTime: new Date("2024-03-11 11:00"),
    printNumber: "A3 20매, A4 50매",
  }),
  ...Array(4).fill({
    status: ManageClubPrintingBusinessStatus.print,
    submitTime: new Date("2024-03-06 09:00"),
    name: "이지윤",
    phoneNumber: "010-1234-5678",
    receiveTime: new Date("2024-03-15 09:00"),
    printNumber: "A3 20매, A4 50매",
  }),
  ...Array(3).fill({
    status: ManageClubPrintingBusinessStatus.receive,
    submitTime: new Date("2024-03-04 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    receiveTime: new Date("2024-03-15 09:00"),
    printNumber: "A3 20매, A4 50매",
  }),

  ...Array(6).fill({
    status: ManageClubPrintingBusinessStatus.cancel,
    submitTime: new Date("2024-03-01 00:00"),
    name: "삼지윤",
    phoneNumber: "010-1234-5678",
    receiveTime: new Date("2024-03-10 09:00"),
    printNumber: "A3 20매, A4 50매",
  }),
  ...Array(6).fill({
    status: ManageClubPrintingBusinessStatus.submit,
    submitTime: new Date("2024-03-01 00:00"),
    name: "삼지윤",
    phoneNumber: "010-1234-5678",
    receiveTime: new Date("2024-03-16 00:00"),
    printNumber: "A3 20매, A4 50매",
  }),
];

export const activityCertificateMockData: ManageClubActivityCertificateData[] =
  [
    ...Array(5).fill({
      status: ManageClubActivityCertificateStatus.approve,
      submitTime: new Date("2024-03-02 21:00"),
      name: "일지윤",
      phoneNumber: "010-1234-5678",
      issueNumber: 3,
      note: "반려 사유가 뭐가 있더라 근데 머 이정도 길이는 되겠지 헤헿",
    }),
    ...Array(4).fill({
      status: ManageClubActivityCertificateStatus.reject,
      submitTime: new Date("2024-03-09 21:00"),
      name: "사지윤",
      phoneNumber: "010-1234-5678",
      issueNumber: 10,
      note: "반려 사유가 뭐가 있어",
    }),
    ...Array(3).fill({
      status: ManageClubActivityCertificateStatus.cancel,
      submitTime: new Date("2024-03-01 05:00"),
      name: "삼지윤",
      phoneNumber: "010-1234-5678",
      issueNumber: 8,
      note: "-",
    }),

    ...Array(6).fill({
      status: ManageClubActivityCertificateStatus.submit,
      submitTime: new Date("2024-03-08 05:00"),
      name: "일지윤",
      phoneNumber: "010-1234-5678",
      issueNumber: 5,
      note: "-",
    }),
    ...Array(6).fill({
      status: ManageClubActivityCertificateStatus.issue,
      submitTime: new Date("2024-03-01 05:00"),
      name: "이지윤",
      phoneNumber: "010-1234-5678",
      issueNumber: 6,
      note: "히히히히히",
    }),
  ];

export const commonSpaceMockData: ManageClubCommonSpaceData[] = [
  ...Array(5).fill({
    status: ManageClubCommonSpaceStatus.cancel,
    submitTime: new Date("2024-03-02 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    reserveTime: new Date("2024-03-21 10:00"),
    reserveStartEndHour: "10:00 ~ 12:00",
    reserveRoom: "제1공용동아리방 (태울관 2101호)",
  }),
  ...Array(9).fill({
    status: ManageClubCommonSpaceStatus.submit,
    submitTime: new Date("2024-03-06 21:00"),
    name: "이지윤",
    phoneNumber: "010-1234-5678",
    reserveTime: new Date("2024-03-15 00:00"),
    reserveStartEndHour: "00:00 ~ 01:00",
    reserveRoom: "머야 이거 어디야",
  }),
  ...Array(8).fill({
    status: ManageClubCommonSpaceStatus.use,
    submitTime: new Date("2024-03-03 21:00"),
    name: "삼지윤",
    phoneNumber: "010-1234-5678",
    reserveTime: new Date("2024-03-20 15:00"),
    reserveStartEndHour: "15:00 ~ 17:00",
    reserveRoom: "제1공용동아리방 (태울관 2101호)",
  }),
];
