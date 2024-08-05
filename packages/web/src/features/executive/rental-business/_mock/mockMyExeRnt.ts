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
      desiredStart: "2024-03-11",
      desiredEnd: "2024-03-18",
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
      desiredStart: "2024-03-11",
      desiredEnd: "2024-03-18",
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
      desiredStart: "2024-03-11",
      desiredEnd: "2024-03-18",
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
      statusEnum: RentalOrderStatusEnum.Approved,
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
      statusEnum: RentalOrderStatusEnum.Rented,
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
      statusEnum: RentalOrderStatusEnum.Returned,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
  ],
  total: 4,
  offset: 4,
};

export default mockupMyExeRnt;
