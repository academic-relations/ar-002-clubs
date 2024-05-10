import {
  ManageClubRentalBusinessData,
  ManageClubRentalBusinessStatus,
} from "./ManageClubTable";

export const mockData: ManageClubRentalBusinessData[] = [
  ...Array(5).fill({
    status: ManageClubRentalBusinessStatus.rent,
    submitTime: new Date("2024-03-02 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-11 00:00"),
    returnTime: undefined,
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
    rentTime: undefined,
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
];
