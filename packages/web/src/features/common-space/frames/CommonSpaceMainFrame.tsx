import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import CommonSpaceInfoFrame from "./CommonSpaceInfoFrame";
import CommonSpaceNoticeFrame from "./CommonSpaceNoticeFrame";

import type { CommonSpaceInterface } from "../types/commonSpace";

const CommonSpaceMainFrame: React.FC = () => {
  const [commonSpace, setCommonSpace] = React.useState<CommonSpaceInterface>({
    agreement: false,
    body: {},
    param: {},
  });
  const props = { commonSpace, setCommonSpace };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "공용공간 비정기사용", path: "/common-space" }]}
        title="공용공간 비정기사용"
      />
      {commonSpace.agreement ? (
        <CommonSpaceInfoFrame {...props} />
      ) : (
        <CommonSpaceNoticeFrame {...props} />
      )}
    </FlexWrapper>
  );
};

export default CommonSpaceMainFrame;
