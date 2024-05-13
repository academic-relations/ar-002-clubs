const mockSemester = "봄";
const mockDeadline = new Date();

const mockAllSemesters = {
  semesters: [
    { id: 1, year: 2020, name: "봄" },
    { id: 2, year: 2020, name: "가을" },
    { id: 3, year: 2021, name: "봄" },
    { id: 4, year: 2021, name: "가을" },
    { id: 5, year: 2022, name: "봄" },
    { id: 6, year: 2022, name: "가을" },
    { id: 7, year: 2023, name: "봄" },
    { id: 8, year: 2023, name: "가을" },
    { id: 9, year: 2024, name: "봄" },
  ],
};

const mockSemesterMembers = {
  members: [
    {
      studentNumber: 20210001,
      name: "일지윤",
      email: "iljiyun_01@example.com",
    },
    {
      studentNumber: 20210002,
      name: "이지윤",
      email: "leejiyun_02@example.com",
      phoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20210003,
      name: "삼지윤",
      email: "samjiyun_03@example.com",
    },
    {
      studentNumber: 20210004,
      name: "사지윤",
      email: "sajiyn_04@example.com",
      phoneNumber: "010-2345-6789",
    },
    {
      studentNumber: 20210005,
      name: "오지윤",
      email: "ohjiyun_05@example.com",
    },
    {
      studentNumber: 20210006,
      name: "일지윤",
      email: "iljiyun_06@example.com",
      phoneNumber: "010-3456-7890",
    },
    {
      studentNumber: 20210007,
      name: "이지윤",
      email: "leejiyun_07@example.com",
    },
    {
      studentNumber: 20210008,
      name: "삼지윤",
      email: "samjiyun_08@example.com",
      phoneNumber: "010-4567-8901",
    },
    { studentNumber: 20210009, name: "사지윤", email: "sajiyn_09@example.com" },
    {
      studentNumber: 20210010,
      name: "오지윤",
      email: "ohjiyun_10@example.com",
      phoneNumber: "010-5678-9012",
    },
    {
      studentNumber: 20210011,
      name: "일지윤",
      email: "iljiyun_11@example.com",
    },
    {
      studentNumber: 20210012,
      name: "이지윤",
      email: "leejiyun_12@example.com",
      phoneNumber: "010-6789-0123",
    },
    {
      studentNumber: 20210013,
      name: "삼지윤",
      email: "samjiyun_13@example.com",
    },
    {
      studentNumber: 20210014,
      name: "사지윤",
      email: "sajiyn_14@example.com",
      phoneNumber: "010-7890-1234",
    },
    {
      studentNumber: 20210015,
      name: "오지윤",
      email: "ohjiyun_15@example.com",
    },
  ],
};

export { mockDeadline, mockSemester, mockAllSemesters, mockSemesterMembers };
