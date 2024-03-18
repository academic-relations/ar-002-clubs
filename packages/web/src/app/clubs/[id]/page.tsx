"use client";

import { usePathname } from "next/navigation";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubs/[id]/frames/ClubDetailMainFrame";

const ClubDetail = () => {
  const pathname = usePathname();
  const splitPath = pathname.split("/"); // pathname을 "/" 기준으로 분할
  const id = splitPath[2]; // 세 번째 부분이 ID ([id]에 해당)

  return (
    <UseClientProvider>
      <ClubDetailMainFrame clubID={id} />
    </UseClientProvider>
  );
};

export default ClubDetail;
