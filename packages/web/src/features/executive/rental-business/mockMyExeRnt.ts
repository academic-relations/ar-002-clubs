const mockupMyExeRnt = {
  items: [
    {
      id: 1,
      studentName: "술박스",
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
      statusEnum: RentalOrderStatusEnum.Applied,
      desiredStart: new Date(),
      desiredEnd: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      studentName: "술박스",
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
      id: 3,
      studentName: "술박스",
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
      id: 4,
      studentName: "술박스",
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

export { mockupMyExeRnt };
