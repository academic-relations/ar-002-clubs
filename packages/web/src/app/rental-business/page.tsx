"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import RentalMainFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalMainFrame";

const RentalBusiness = () => (
  <UseClientProvider>
    <RentalMainFrame />
  </UseClientProvider>
);

export default RentalBusiness;
