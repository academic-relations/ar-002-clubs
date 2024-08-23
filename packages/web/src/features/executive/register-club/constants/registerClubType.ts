import { TagColor } from "@sparcs-clubs/web/common/components/Tag";

enum RegisterClubTypeEnum {
  Provisional = 1, // 가등록
  Promotional, // 신규 등록
  Renewal, // 재등록
}

export const RegisterClubTypeName = {
  [RegisterClubTypeEnum.Provisional]: "가등록",
  [RegisterClubTypeEnum.Promotional]: "신규 등록",
  [RegisterClubTypeEnum.Renewal]: "재등록",
};

export const RegisterClubTypeTagColor: Record<RegisterClubTypeEnum, TagColor> =
  {
    [RegisterClubTypeEnum.Provisional]: "BLUE",
    [RegisterClubTypeEnum.Promotional]: "ORANGE",
    [RegisterClubTypeEnum.Renewal]: "PURPLE",
  };

export default RegisterClubTypeEnum;
