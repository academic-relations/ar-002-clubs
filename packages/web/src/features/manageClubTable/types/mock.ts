import {
  ManageClubRentalBusinessData,
  ManageClubRentalBusinessStatus,
} from "./ManageClubTable";

export const mockData: ManageClubRentalBusinessData[] = [
  ...Array(8).fill({
    status: ManageClubRentalBusinessStatus.rent,
    submitTime: new Date("2024-03-04 21:00"),
    name: "일지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-11 00:00"),
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
  ...Array(9).fill({
    status: ManageClubRentalBusinessStatus.rent,
    submitTime: new Date("2024-03-06 09:00"),
    name: "이지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-11 00:00"),
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
  ...Array(6).fill({
    status: ManageClubRentalBusinessStatus.rent,
    submitTime: new Date("2024-03-01 00:00"),
    name: "삼지윤",
    phoneNumber: "010-1234-5678",
    rentTime: new Date("2024-03-11 00:00"),
    returnTime: new Date("2024-03-18 00:00"),
    rentProducts: "돗자리 3개 외 2항목",
  }),
];
