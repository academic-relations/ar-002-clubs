import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import {
  PromotionalPrintingOrderStatusEnum,
  PromotionalPrintingSizeEnum,
} from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import type { ApiAcf003ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import type { ApiClb004ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb004";
import type { ApiClb006ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import type { ApiClb010ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb010";
import type { ApiCms006ResponseOk } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import type { ApiPrt001ResponseOk } from "@sparcs-clubs/interface/api/promotional-printing/endpoint/apiPrt001";
import type { ApiRnt003ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";

export interface Activity {
  id: number;
  status: number;
  name: string;
  type: number;
  startDate: Date;
  endDate: Date;
}

export interface Funding {
  id: number;
  status: number;
  name: string;
  itemName: string;
  requestedAmount: number;
  approvedAmount: number | null;
}

export interface Members {
  id: number;
  status: number;
  applicationDate: Date;
  studentId: string;
  applicantName: string;
  phoneNumber: string;
  email: string;
  memo?: string;
}

export enum ActivityStatusEnum {
  Writing = 1, // 작성 중
  Applied, // 신청
  Approved, // 승인
  Rejected, // 반려
}

export enum ActivityTypeEnum {
  FitInside = 1, // 동아리 성격에 합치하는 내부활동
  FitOutside, // 동아리 성격에 합치하는 외부활동
  NotFit, // 동아리 성격에 합치하지 않는 활동
}

export enum MemberStatusEnum {
  Applied = 1, // 신청
  Approved, // 승인
  Rejected, // 반려
}
const mockClubDescription: ApiClb004ResponseOK = {
  description: "동아리 설명입니다",
  roomPassword: "password",
};

const mockClubRepresentatives: ApiClb006ResponseOK = {
  representatives: [
    {
      representitiveEnum: 1,
      studentId: 20200510,
      name: "이지윤",
      phoneNumber: "010-1234-5678",
    },
    {
      representitiveEnum: 2,
      studentId: 20200511,
      name: "박지호",
      phoneNumber: "010-1234-5678",
    },
    {
      representitiveEnum: 2,
      studentId: 20200512,
      name: "박병찬",
      phoneNumber: "010-1234-5678",
    },
  ],
};

const mockClubMembers: ApiClb010ResponseOk = {
  members: [
    {
      studentNumber: 20200510,
      name: "이지윤",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200511,
      name: "박지호",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200512,
      name: "박병찬",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200001,
      name: "일지윤",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200002,
      name: "이지윤",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200003,
      name: "삼지윤",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200004,
      name: "사지윤",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
    {
      studentNumber: 20200005,
      name: "오지윤",
      email: "test@kaist.ac.kr",
      krPhoneNumber: "010-1234-5678",
    },
  ],
};

const mockupManageMems: Members[] = [
  {
    id: 1,
    status: 1,
    applicationDate: new Date("2024-03-04T21:00:00"),
    studentId: "20200510",
    applicantName: "이지윤",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    id: 2,
    status: 1,
    applicationDate: new Date("2024-03-04T22:00:00"),
    studentId: "20200511",
    applicantName: "박지호",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    id: 3,
    status: 1,
    applicationDate: new Date("2024-03-04T23:00:00"),
    studentId: "20200512",
    applicantName: "박병찬",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    id: 4,
    status: 2,
    applicationDate: new Date("2024-03-04T21:30:00"),
    studentId: "20200513",
    applicantName: "이도라",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
  },
  {
    id: 5,
    status: 3,
    applicationDate: new Date("2024-03-04T20:30:00"),
    studentId: "20200514",
    applicantName: "스팍스",
    phoneNumber: "XXX-XXXX-XXXX",
    email: "nicolelee2001@kaist.ac.kr",
    memo: "휴동",
  },
];

const mockupManageFunding: Funding[] = [
  {
    id: 1,
    status: 1,
    name: "개발개발한 어떠한 활동",
    itemName: "모니터",
    requestedAmount: 300000,
    approvedAmount: null,
  },
  {
    id: 2,
    status: 1,
    name: "개발개발한 어떠한 활동",
    itemName: "모니터",
    requestedAmount: 300000,
    approvedAmount: null,
  },
  {
    id: 3,
    status: 2,
    name: "개발개발한 어떠한 활동",
    itemName: "모니터",
    requestedAmount: 300000,
    approvedAmount: null,
  },
  {
    id: 4,
    status: 4,
    name: "개발개발한 어떠한 활동",
    itemName: "모니터",
    requestedAmount: 300000,
    approvedAmount: null,
  },
  {
    id: 5,
    status: 3,
    name: "개발개발한 어떠한 활동",
    itemName: "모니터",
    requestedAmount: 300000,
    approvedAmount: 300000,
  },
  {
    id: 6,
    status: 3,
    name: "2024년도 봄학기 MT",
    itemName: "모니터",
    requestedAmount: 300000,
    approvedAmount: 0,
  },
];

const mockupManageReport: Activity[] = [
  {
    id: 1,
    status: 1,
    name: "개발개발한 어떠한 활동",
    type: 1,
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    id: 2,
    status: 2,
    name: "개발개발한 어떠한 활동",
    type: 1,
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    id: 3,
    status: 2,
    name: "개발개발한 어떠한 활동",
    type: 2,
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    id: 4,
    status: 4,
    name: "개발개발한 어떠한 활동",
    type: 2,
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    id: 5,
    status: 3,
    name: "개발개발한 어떠한 활동",
    type: 1,
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
  {
    id: 6,
    status: 3,
    name: "2024년도 봄학기 MT",
    type: 3,
    startDate: new Date("2024-03-11"),
    endDate: new Date("2024-03-18"),
  },
];

const mockupManageRental: ApiRnt003ResponseOK = {
  items: [
    {
      id: 1,
      studentName: "이지윤",
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
      studentName: "이지윤",
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
      studentName: "이지윤",
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
      studentName: "이지윤",
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

const mockupManagePrint: ApiPrt001ResponseOk = {
  items: [
    {
      id: 1,
      studentName: "이지윤",
      status: PromotionalPrintingOrderStatusEnum.Applied,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 50,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 20,
        },
      ],
      desiredPickUpDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 2,
      studentName: "이지윤",
      status: PromotionalPrintingOrderStatusEnum.Approved,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 50,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 20,
        },
      ],
      desiredPickUpDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 3,
      studentName: "이지윤",
      status: PromotionalPrintingOrderStatusEnum.Printed,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 50,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 20,
        },
      ],
      desiredPickUpDate: new Date(),
      createdAt: new Date(),
    },
    {
      id: 4,
      studentName: "이지윤",
      status: PromotionalPrintingOrderStatusEnum.Received,
      orders: [
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
          numberOfPrints: 50,
        },
        {
          promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
          numberOfPrints: 20,
        },
      ],
      desiredPickUpDate: new Date(),
      createdAt: new Date(),
    },
  ],
  total: 4,
  offset: 1,
};

const mockupManageAcf: ApiAcf003ResponseOk = {
  items: [
    {
      orderId: 1,
      studentName: "이지윤",
      issuedNumber: 2,
      statusEnum: ActivityCertificateOrderStatusEnum.Applied,
      createdAt: new Date(),
    },
    {
      orderId: 2,
      studentName: "이지윤",
      issuedNumber: 3,
      statusEnum: ActivityCertificateOrderStatusEnum.Approved,
      createdAt: new Date(),
    },
    {
      orderId: 3,
      studentName: "이지윤",
      issuedNumber: 2,
      statusEnum: ActivityCertificateOrderStatusEnum.Issued,
      createdAt: new Date(),
    },
    {
      orderId: 4,
      studentName: "이지윤",
      issuedNumber: 3,
      statusEnum: ActivityCertificateOrderStatusEnum.Rejected,
      createdAt: new Date(),
    },
  ],
  total: 4,
  offset: 1,
};

const mockupManageCms: ApiCms006ResponseOk = {
  items: [
    {
      orderId: 1,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Applied,
      spaceName: "제1공용동아리방 (태울관 2101호)",
      chargeStudentName: "이지윤",
      startTerm: new Date(),
      endTerm: new Date(),
      createdAt: new Date(),
    },
    {
      orderId: 2,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Applied,
      spaceName: "제1공용동아리방 (태울관 2101호)",
      chargeStudentName: "이지윤",
      startTerm: new Date(),
      endTerm: new Date(),
      createdAt: new Date(),
    },
    {
      orderId: 3,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Canceled,
      spaceName: "제1공용동아리방 (태울관 2101호)",
      chargeStudentName: "이지윤",
      startTerm: new Date(),
      endTerm: new Date(),
      createdAt: new Date(),
    },
    {
      orderId: 4,
      statusEnum: CommonSpaceUsageOrderStatusEnum.Used,
      spaceName: "제1공용동아리방 (태울관 2101호)",
      chargeStudentName: "이지윤",
      startTerm: new Date(),
      endTerm: new Date(),
      createdAt: new Date(),
    },
  ],
  total: 4,
  offset: 1,
};

export {
  mockupManageReport,
  mockupManageFunding,
  mockupManageMems,
  mockupManageAcf,
  mockupManageRental,
  mockupManagePrint,
  mockupManageCms,
  mockClubDescription,
  mockClubRepresentatives,
  mockClubMembers,
};
