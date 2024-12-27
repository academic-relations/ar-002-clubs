import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import { useCheckManageClub } from "@sparcs-clubs/web/hooks/checkManageClub";

import { ManageClubStorageTableFrame } from "./ManageClubStorageTableFrame";

export const ManageClubStorageMainFrame = () => {
  const { delegate, isLoading, clubId } = useCheckManageClub();

  if (!delegate && clubId) {
    return <NoManageClub />;
  }

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: "창고 신청 내역",
            path: "/manage-club/storage",
          },
        ]}
        title="창고 신청 내역"
      />
      <AsyncBoundary isLoading={isLoading} isError={false}>
        <ManageClubStorageTableFrame clubId={clubId || 0} />
      </AsyncBoundary>
    </FlexWrapper>
  );
};
