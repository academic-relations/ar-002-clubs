import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import { PromotionalPrintingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";
import { StorageStatusEnum } from "@sparcs-clubs/interface/common/enum/storage.enum";

import { StatusAndDate } from "../common/components/ProgressCheckSection";
import { ProgressCheckSectionStatusEnum } from "../common/components/ProgressCheckSection/progressCheckStationStatus";

interface ManageProgress {
  labels: string[];
  progress: StatusAndDate[];
  infoText?: string;
}

export const manageRentalProgress = (
  status: RentalOrderStatusEnum,
): ManageProgress => {
  switch (status) {
    case RentalOrderStatusEnum.Applied:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 대기",
          "대여 대기",
          "반납 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "승인이 완료되기 전까지 신청을 취소할 수 있습니다",
      };
    case RentalOrderStatusEnum.Approved:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "대여 대기",
          "반납 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        // TODO: 날짜 넣기
        infoText: "2024년 3월 11일(월)부터 대여할 수 있습니다",
      };
    case RentalOrderStatusEnum.Rented:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "대여 완료",
          "반납 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        // TODO: 날짜 넣기
        infoText: "2024년 3월 18일(월)까지 반납해주시기 바랍니다",
      };
    case RentalOrderStatusEnum.Returned:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "대여 완료",
          "반납 완료",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
      };
    case RentalOrderStatusEnum.Rejected:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 반려",
          "대여 대기",
          "반납 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
        // TODO: 반려사유 넣기
        infoText: "동아리 연합회 반려 사유: 어쩌고 저쩌고",
      };
    // TODO: 연체, 취소 만들기
    default:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 대기",
          "대여 대기",
          "반납 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "승인이 완료되기 전까지 신청을 취소할 수 있습니다",
      };
  }
};

export const manageCommonSpaceProgress = (
  status: CommonSpaceUsageOrderStatusEnum,
): ManageProgress => {
  switch (status) {
    case CommonSpaceUsageOrderStatusEnum.Applied:
      return {
        labels: ["신청 완료", "사용 대기"],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "승인이 완료되기 전까지 신청을 취소할 수 있습니다",
      };
    case CommonSpaceUsageOrderStatusEnum.Used:
      return {
        labels: ["신청 완료", "사용 완료"],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
      };
    default: // Canceled
      return {
        labels: ["신청 취소", "사용 대기"],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
      };
  }
};

export const managePrintingProgress = (
  status: PromotionalPrintingOrderStatusEnum,
): ManageProgress => {
  switch (status) {
    case PromotionalPrintingOrderStatusEnum.Applied:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 대기",
          "출력 대기",
          "수령 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "승인이 완료되기 전까지 신청을 취소할 수 있습니다",
      };
    case PromotionalPrintingOrderStatusEnum.Approved:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "출력 대기",
          "수령 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "2024년 3월 11일(월) 21:00에 수령해주시기 바랍니다",
      };
    case PromotionalPrintingOrderStatusEnum.Printed:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "출력 완료",
          "수령 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "2024년 3월 11일(월) 21:00에 수령해주시기 바랍니다",
      };
    case PromotionalPrintingOrderStatusEnum.Received:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "출력 완료",
          "수령 완료",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
      };
    // TODO: 취소, 반려 필요
    default:
      return {
        labels: ["신청 취소", "사용 대기"],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
      };
  }
};

export const manageActivityCertificateProgress = (
  status: ActivityCertificateOrderStatusEnum,
): ManageProgress => {
  switch (status) {
    case ActivityCertificateOrderStatusEnum.Applied:
      return {
        labels: [
          "신청 완료",
          "동아리 대표자 승인 대기",
          "동아리 연합회 승인 대기",
          "발급 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText:
          "동아리 대표자의 승인이 있어야 다음 단계로 넘어갈 수 있습니다. 반려 시 사유를 입력해야함",
      };
    case ActivityCertificateOrderStatusEnum.Approved:
      return {
        labels: [
          "신청 완료",
          "동아리 대표자 승인 완료",
          "동아리 연합회 승인 대기",
          "발급 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
      };
    case ActivityCertificateOrderStatusEnum.Issued:
      return {
        labels: [
          "신청 완료",
          "동아리 대표자 승인 완료",
          "동아리 연합회 승인 완료",
          "발급 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "발급이 완료되면 이메일이 갈거에요~",
      };
    case ActivityCertificateOrderStatusEnum.Received:
      return {
        labels: [
          "신청 완료",
          "동아리 대표자 승인 완료",
          "동아리 연합회 승인 완료",
          "발급 완료",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
      };
    // TODO: 동아리 대표자 / 동아리 연합회 반려 분리 필요
    case ActivityCertificateOrderStatusEnum.Rejected:
      return {
        labels: [
          "신청 완료",
          "동아리 대표자 승인 반려",
          "동아리 연합회 승인 대기",
          "발급 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
        infoText: "동아리 대표자 반려 사유: 어쩌고 저쩌고",
      };
    default: // 동연 반려F
      return {
        labels: [
          "신청 완료",
          "동아리 대표자 승인 완료",
          "동아리 연합회 승인 반려",
          "발급 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
        infoText: "동아리 연합회 반려 사유: 어쩌고 저쩌고",
      };
  }
};

export const manageStorageProgress = (
  status: StorageStatusEnum,
): ManageProgress => {
  switch (status) {
    case StorageStatusEnum.Applied:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 대기",
          "계약서 작성 및 송금 대기",
          "반출 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "승인이 완료되기 전까지 신청을 취소할 수 있습니다",
      };
    case StorageStatusEnum.Canceled:
      return {
        labels: [
          "신청 취소",
          "동아리 연합회 승인 대기",
          "계약서 작성 및 송금 대기",
          "반출 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
      };
    case StorageStatusEnum.Approved:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "계약서 작성 및 송금 대기",
          "반출 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText:
          "신청서에 작성한 상자 수령 일시에 상자 수령 후, 보관 시작 일시에 보관 물품을 동아리연합회실로 가지고 오시기 바랍니다",
      };
    case StorageStatusEnum.Rejected:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "계약서 작성 및 송금 대기",
          "반출 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
        infoText: "동아리 연합회 반려 사유: 어쩌고 저쩌고",
      };
    case StorageStatusEnum.Received:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "계약서 작성 및 송금 완료",
          "반출 대기",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
        infoText: "2024년 3월 18일(월)까지 보관한 물품을 반출해주시기 바랍니다",
      };
    case StorageStatusEnum.Shipped:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "계약서 작성 및 송금 완료",
          "반출 완료",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: new Date() },
        ],
      };
    default:
      return {
        labels: [
          "신청 완료",
          "동아리 연합회 승인 완료",
          "계약서 작성 및 송금 완료",
          "사용 연체",
        ],
        progress: [
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Approved, date: undefined },
          { status: ProgressCheckSectionStatusEnum.Canceled, date: new Date() },
        ],
        infoText: "반출일인 2024년 3월 18일(월)로부터 3일이 연체되었습니다",
      };
  }
};
