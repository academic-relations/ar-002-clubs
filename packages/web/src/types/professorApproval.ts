import { TagColor } from "@sparcs-clubs/web/common/components/Tag";

enum ProfessorApprovalEnum {
  Pending = 1, // 대기
  Approved, // 승인
  Rejected, // 반려
}

const ProfessorApprovalLabel: Record<ProfessorApprovalEnum, string> = {
  [ProfessorApprovalEnum.Pending]: "대기",
  [ProfessorApprovalEnum.Approved]: "승인",
  [ProfessorApprovalEnum.Rejected]: "반려",
};
export const getProfessorApprovalLabel = (
  professorApproval: ProfessorApprovalEnum,
): string => ProfessorApprovalLabel[professorApproval];

const ProfessorApprovalTagColor: Record<ProfessorApprovalEnum, TagColor> = {
  [ProfessorApprovalEnum.Pending]: "GRAY",
  [ProfessorApprovalEnum.Approved]: "GREEN",
  [ProfessorApprovalEnum.Rejected]: "RED",
};
export const getProfessorApprovalTagColor = (
  professorApproval: ProfessorApprovalEnum,
): TagColor => ProfessorApprovalTagColor[professorApproval];

export default ProfessorApprovalEnum;
