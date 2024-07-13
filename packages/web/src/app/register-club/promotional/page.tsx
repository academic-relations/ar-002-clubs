"use client";

import RegisterClubMainFrame from "@sparcs-clubs/web/features/register-club/frame/RegisterClubMainFrame";
import { RegisterClubType } from "@sparcs-clubs/web/features/register-club/types/registerClub";

const PromotionalRegisterClub = () => (
  <RegisterClubMainFrame type={RegisterClubType.promotional} />
);

export default PromotionalRegisterClub;
