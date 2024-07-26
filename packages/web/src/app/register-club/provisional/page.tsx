"use client";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frame/RegisterClubMainFrame";
import { RegisterClubType } from "@sparcs-clubs/web/features/register-club/types/registerClub";

const ProvisionalRegisterClub = () => (
  <RegisterClubMainFrame type={RegisterClubType.provisional} />
);

export default ProvisionalRegisterClub;
