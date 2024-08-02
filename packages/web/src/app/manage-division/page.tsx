"use client";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import DivisionInfoFrame from "@sparcs-clubs/web/features/manage-devision/frames/DivisionInfoFrame";

const ManageDivision: React.FC = () => (
  <FlexWrapper gap={60} direction="column">
    <PageHead
      items={[{ name: "분과 관리", path: "/manage-division" }]}
      title="분과 관리"
    />
    <DivisionInfoFrame />
  </FlexWrapper>
);

export default ManageDivision;
