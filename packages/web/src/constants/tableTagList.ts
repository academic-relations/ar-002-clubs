import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import { PromotionalPrintingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import {
  ActivityStatusEnum,
  ActivityTypeEnum,
  MemberStatusEnum,
} from "../features/manage-club/service/_mock/mockManageClub";
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
};

const MemTagList: {
  [key in MemberStatusEnum]: StatusDetail;
} = {
  [MemberStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [MemberStatusEnum.Approved]: { text: "승인", color: "YELLOW" },
  [MemberStatusEnum.Rejected]: { text: "반려", color: "RED" },
};

const ApplyTagList: {
  [key in ActivityStatusEnum]: StatusDetail;
} = {
  [ActivityStatusEnum.Writing]: { text: "작성 중", color: "BLUE" },
  [ActivityStatusEnum.Applied]: { text: "신청 완료", color: "PURPLE" },
  [ActivityStatusEnum.Approved]: { text: "승인 완료", color: "GREEN" },
  [ActivityStatusEnum.Rejected]: { text: "신청 반려", color: "RED" },
};

const ActTypeTagList: {
  [key in ActivityTypeEnum]: StatusDetail;
} = {
  [ActivityTypeEnum.FitInside]: {
    text: "동아리 성격에 합치하는 내부 활동",
    color: "YELLOW",
  },
  [ActivityTypeEnum.FitOutside]: {
    text: "동아리 성격에 합치하는 외부 활동",
    color: "BLUE",
  },
  [ActivityTypeEnum.NotFit]: {
    text: "동아리 성격에 합치하지 않는 활동",
    color: "PURPLE",
  },
};
export {
  AcfTagList,
  CmsTagList,
  PrtTagList,
  RntTagList,
  MemTagList,
  ApplyTagList,
  ActTypeTagList,
};
