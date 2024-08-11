import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

const mockupMyExeRnt = {
  items: [
    {
      id: 1,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 4,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Rejected,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 5,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 6,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 7,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 8,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Rented,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 9,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Returned,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 10,
      studentName: "술박스",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Overdue,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 11,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 12,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 13,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 14,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Rejected,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 15,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 16,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 17,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 18,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Rented,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 19,
      studentName: "술박스2",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Returned,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 20,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Overdue,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 21,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 22,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 23,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "전동 드릴 세트",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date("2024-03-11"),
      desiredEnd: new Date("2024-03-18"),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 24,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Rejected,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 25,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 26,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 27,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Approved,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 28,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Rented,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 29,
      studentName: "술박스3",
      applicantName: "이지윤",
      phoneNumber: "010-9612-4975",
      objects: [
        {
          id: 1,
          name: "돗자리",
          number: 3,
        },
        {
          id: 2,
          name: "드릴",
          number: 1,
        },
        {
          id: 3,
          name: "어쩌구",
          number: 1,
        },
      ],
      statusEnum: RentalOrderStatusEnum.Returned,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
  ],
  total: 10,
  offset: 10,
};

export default mockupMyExeRnt;