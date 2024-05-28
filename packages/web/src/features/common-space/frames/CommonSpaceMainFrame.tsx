import React from "react";
import styled from "styled-components";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import type { CommonSpaceInterface } from "../types/commonSpace";
import CommonSpaceInfoFrame from "./CommonSpaceInfoFrame";
import CommonSpaceNoticeFrame from "./CommonSpaceNoticeFrame";

const CommonSpaceMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const CommonSpaceMainFrame: React.FC = () => {
  const [commonSpace, setCommonSpace] = React.useState<CommonSpaceInterface>({
    agreement: false,
  });
  const props = { commonSpace, setCommonSpace };
  return (
    <CommonSpaceMainFrameInner>
      <PageHead
        items={[{ name: "공용공간 비정기사용", path: "/common-space" }]}
        title="공용공간 비정기사용"
      />
      {commonSpace.agreement ? (
        <CommonSpaceInfoFrame {...props} />
      ) : (
        <CommonSpaceNoticeFrame {...props} />
      )}
    </CommonSpaceMainFrameInner>
  );
};

export default CommonSpaceMainFrame;
