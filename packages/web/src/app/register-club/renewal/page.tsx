"use client";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frame/RegisterClubMainFrame";
import { RegisterClubType } from "@sparcs-clubs/web/features/register-club/types/registerClub";

const RenewalRegisterClub = () => (
  <RegisterClubMainFrame type={RegisterClubType.renewal} />
);

export default RenewalRegisterClub;
