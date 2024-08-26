"use client";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frames/RegisterClubMainFrame";

const PromotionalRegisterClub = () => (
  <RegisterClubMainFrame type={RegistrationTypeEnum.Promotional} />
);

export default PromotionalRegisterClub;
