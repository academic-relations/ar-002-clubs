"use client";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
// import clubsData from "./data/clubs";

const Clubs = () => (
  <main>
    <UseClientProvider>
      <SectionTitle>생활문화</SectionTitle>
    </UseClientProvider>
  </main>
);

export default Clubs;
