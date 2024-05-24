import React from "react";
import styled from "styled-components";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import type { CommonSpaceInterface } from "../types/commonSpace";
import CommonSpaceNoticeFrame from "./CommonSpaceNoticeFrame";
import CommonSpaceInfoFrame from "./CommonSpaceInfoFrame";

const CommonSpaceMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const CommonSpaceMainFrame: React.FC = () => {
  const [commonSpace, setCommonSpace] = React.useState<CommonSpaceInterface>({
    agreement: false,
    body: {},
    param: {},
  });
  const props = { commonSpace, setCommonSpace };

  return (
    <CommonSpaceMainFrameInner>
      <PageTitle>공용공간 비정기사용</PageTitle>
      {commonSpace.agreement ? (
        <CommonSpaceInfoFrame {...props} />
      ) : (
        <CommonSpaceNoticeFrame {...props} />
      )}
    </CommonSpaceMainFrameInner>
  );
};

export default CommonSpaceMainFrame;
