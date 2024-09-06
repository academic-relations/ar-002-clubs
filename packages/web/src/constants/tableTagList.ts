import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";
import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import { PromotionalPrintingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import {
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

import { TagColor } from "../common/components/Tag";
import {
  ActivityProfessorApprovalEnum,
  FundingStatusEnum,
  MemberStatusEnum,
} from "../features/manage-club/services/_mock/mockManageClub";
import { StatusDetail } from "../utils/getTagDetail";

const AcfTagList: {
  [key in ActivityCertificateOrderStatusEnum]: StatusDetail;
} = {
  [ActivityCertificateOrderStatusEnum.Applied]: {
    text: "신청",
    color: "BLUE",
  },
  [ActivityCertificateOrderStatusEnum.Approved]: {
    text: "승인",
    color: "YELLOW",
  },
  [ActivityCertificateOrderStatusEnum.Issued]: {
    text: "발급",
    color: "GREEN",
  },
  [ActivityCertificateOrderStatusEnum.Rejected]: {
    text: "반려",
    color: "RED",
  },
  [ActivityCertificateOrderStatusEnum.Received]: {
    text: "수령",
    color: "GREEN",
  }, // TODO: 수령 따로 필요한지 확인
};

const CmsTagList: {
  [key in CommonSpaceUsageOrderStatusEnum]: StatusDetail;
} = {
  [CommonSpaceUsageOrderStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [CommonSpaceUsageOrderStatusEnum.Canceled]: { text: "취소", color: "GRAY" },
  [CommonSpaceUsageOrderStatusEnum.Used]: { text: "사용", color: "GREEN" },
};

const PrtTagList: {
  [key in PromotionalPrintingOrderStatusEnum]: StatusDetail;
} = {
  [PromotionalPrintingOrderStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [PromotionalPrintingOrderStatusEnum.Approved]: {
    text: "승인",
    color: "YELLOW",
  },
  [PromotionalPrintingOrderStatusEnum.Printed]: {
    text: "출력",
    color: "PURPLE",
  },
  [PromotionalPrintingOrderStatusEnum.Received]: {
    text: "수령",
    color: "GREEN",
  },
};

const RntTagList: {
  [key in RentalOrderStatusEnum]: StatusDetail;
} = {
  [RentalOrderStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [RentalOrderStatusEnum.Approved]: { text: "승인", color: "YELLOW" },
  [RentalOrderStatusEnum.Rented]: { text: "대여", color: "PURPLE" },
  [RentalOrderStatusEnum.Returned]: { text: "반납", color: "GREEN" },
  [RentalOrderStatusEnum.Overdue]: { text: "연체", color: "PINK" },
  [RentalOrderStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

const MemTagList: {
  [key in MemberStatusEnum]: StatusDetail;
} = {
  [MemberStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [MemberStatusEnum.Approved]: { text: "승인", color: "GREEN" },
  [MemberStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

const FundingTagList: {
  [key in FundingStatusEnum]: StatusDetail;
} = {
  [FundingStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [FundingStatusEnum.Committee]: { text: "운위", color: "YELLOW" },
  [FundingStatusEnum.Approved]: { text: "승인", color: "GREEN" },
  [FundingStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

// TODO: interface enum 사용
const ApplyTagList: {
  [key in ActivityStatusEnum]: StatusDetail;
} = {
  // [ActivityStatusEnum.Committee]: { text: "운위", color: "ORANGE" },
  [ActivityStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [ActivityStatusEnum.Approved]: { text: "승인", color: "GREEN" },
  [ActivityStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

const ProfessorApprovalTagList: {
  [key in ActivityProfessorApprovalEnum]: StatusDetail;
} = {
  [ActivityProfessorApprovalEnum.Requested]: { text: "대기", color: "GRAY" },
  [ActivityProfessorApprovalEnum.Approved]: { text: "승인", color: "GREEN" },
  [ActivityProfessorApprovalEnum.Denied]: { text: "반려", color: "RED" },
};

const ProfessorIsApprovedTagList: (isApproved: boolean) => {
  text: string;
  color: TagColor;
} = isApproved => {
  if (isApproved) return { text: "승인", color: "GREEN" };
  return { text: "대기", color: "GRAY" };
};

const ActTypeTagList: {
  [key in ActivityTypeEnum]: StatusDetail;
} = {
  [ActivityTypeEnum.matchedInternalActivity]: {
    text: "동아리 성격에 합치하는 내부 활동",
    color: "YELLOW",
  },
  [ActivityTypeEnum.matchedExternalActivity]: {
    text: "동아리 성격에 합치하는 외부 활동",
    color: "BLUE",
  },
  [ActivityTypeEnum.notMatchedActivity]: {
    text: "동아리 성격에 합치하지 않는 활동",
    color: "PURPLE",
  },
};

const ActStatusTagList: {
  [key in ActivityStatusEnum]: StatusDetail;
} = {
  [ActivityStatusEnum.Applied]: { text: "대기", color: "GRAY" },
  [ActivityStatusEnum.Approved]: { text: "승인", color: "GREEN" },
  [ActivityStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

const RegistrationStatusTagList: {
  [key in RegistrationStatusEnum]: StatusDetail;
} = {
  [RegistrationStatusEnum.Approved]: { text: "승인", color: "GREEN" },
  [RegistrationStatusEnum.Pending]: { text: "신청", color: "BLUE" },
  [RegistrationStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

const RegistrationTypeTagList: { [key in RegistrationTypeEnum]: StatusDetail } =
  {
    [RegistrationTypeEnum.Renewal]: { text: "재등록", color: "PURPLE" },
    [RegistrationTypeEnum.Promotional]: { text: "신규 등록", color: "YELLOW" },
    [RegistrationTypeEnum.NewProvisional]: { text: "가등록", color: "BLUE" },
    [RegistrationTypeEnum.ReProvisional]: { text: "가등록", color: "BLUE" },
  };

const DivisionTypeTagList: { [key in DivisionType]: StatusDetail } = {
  [DivisionType.InstrumentalMusic]: { text: "연주음악", color: "ORANGE" },
  [DivisionType.VocalMusic]: { text: "보컬음악", color: "ORANGE" },
  [DivisionType.BandMusic]: { text: "밴드음악", color: "ORANGE" },
  [DivisionType.LifeSports]: { text: "생활체육", color: "PINK" },
  [DivisionType.BallSports]: { text: "구기체육", color: "PINK" },
  [DivisionType.HumanitiesAcademics]: { text: "인문학술", color: "YELLOW" },
  [DivisionType.ScienceEngineeringAcademics]: {
    text: "이공학술",
    color: "YELLOW",
  },
  [DivisionType.PerformingArts]: { text: "연행예술", color: "BLUE" },
  [DivisionType.ExhibitionCreation]: { text: "전시창작", color: "BLUE" },
  [DivisionType.LifeCulture]: { text: "생활문화", color: "GREEN" },
  [DivisionType.Society]: { text: "사회", color: "PURPLE" },
  [DivisionType.Religion]: { text: "종교", color: "PURPLE" },
};

export {
  AcfTagList,
  CmsTagList,
  PrtTagList,
  RntTagList,
  MemTagList,
  ApplyTagList,
  ActStatusTagList,
  ProfessorApprovalTagList,
  ProfessorIsApprovedTagList,
  ActTypeTagList,
  FundingTagList,
  RegistrationTypeTagList,
  RegistrationStatusTagList,
  DivisionTypeTagList,
};
