import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import React from "react";
import styled from "styled-components";
import type { CommonSpaceInterface } from "../types/commonSpace";
import CommonSpaceInfoFrame from "./CommonSpaceInfoFrame";
import CommonSpaceNoticeFrame from "./CommonSpaceNoticeFrame";

const CommonSpaceMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CommonSpaceMainFrame: React.FC = () => {
  const [commonSpace, setCommonSpace] = React.useState<CommonSpaceInterface>({
    agreement: false,
  });
  const props = { commonSpace, setCommonSpace };
  return (
    <CommonSpaceMainFrameInner>
      <PageHeadWrapper>
        <BreadCrumb
          items={[{ name: "공용공간 비정기사용", path: "/common-space" }]}
        />
        <PageTitle>공용공간 비정기사용</PageTitle>
      </PageHeadWrapper>
      {commonSpace.agreement ? (
        <CommonSpaceInfoFrame {...props} />
      ) : (
        <CommonSpaceNoticeFrame {...props} />
      )}
    </CommonSpaceMainFrameInner>
  );
};

export default CommonSpaceMainFrame;
