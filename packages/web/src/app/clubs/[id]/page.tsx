"use client";

import { usePathname } from "next/navigation";

import ExampleComponent from "@sparcs-clubs/web/common/components/ExampleComponent";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

const ClubDetail = () => {
  const pathname = usePathname();
  const splitPath = pathname.split("/"); // pathname을 "/" 기준으로 분할
  const id = splitPath[2]; // 세 번째 부분이 ID ([id]에 해당)

  return (
    <UseClientProvider>
      <ExampleComponent>
        Welcome to SPARCS Clubs! The frontend is working well! ID: {id}
      </ExampleComponent>
    </UseClientProvider>
  );
};

export default ClubDetail;
