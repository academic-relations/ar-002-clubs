"use client";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import clubsData from "./data/clubs";

const Clubs = () => (
  <main>
    <UseClientProvider>{clubsData.toString()}</UseClientProvider>
  </main>
);

export default Clubs;
