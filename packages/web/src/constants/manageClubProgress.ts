import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import { StatusAndDate } from "../common/components/ProgressCheckSection";
import { Status } from "../common/components/ProgressCheckSection/_atomic/ProgressDot";

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
        progress: [{ status: Status.Approved, date: new Date() }],
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
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
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
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
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
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
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
          { status: Status.Approved, date: new Date() },
          { status: Status.Canceled, date: new Date() },
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
        progress: [{ status: Status.Approved, date: new Date() }],
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
        progress: [{ status: Status.Approved, date: new Date() }],
        infoText: "승인이 완료되기 전까지 신청을 취소할 수 있습니다",
      };
    case CommonSpaceUsageOrderStatusEnum.Used:
      return {
        labels: ["신청 완료", "사용 완료"],
        progress: [
          { status: Status.Approved, date: new Date() },
          { status: Status.Approved, date: new Date() },
        ],
      };
    default: // Canceled
      return {
        labels: ["신청 취소", "사용 대기"],
        progress: [{ status: Status.Canceled, date: new Date() }],
      };
  }
};
