"use client";

import { RegistrationTypeEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frames/RegisterClubMainFrame";

const RenewalRegisterClub = () => (
  <RegisterClubMainFrame type={RegistrationTypeEnum.Renewal} />
);

export default RenewalRegisterClub;
