import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import CommonSpaceInfoFrame from "./CommonSpaceInfoFrame";
import CommonSpaceNoticeFrame from "./CommonSpaceNoticeFrame";

import type { CommonSpaceInterface } from "../types/commonSpace";

const CommonSpaceMainFrame: React.FC = () => {
  const [agreement, setAgreement] = React.useState(false);
  const [body, setBody] = React.useState<CommonSpaceInterface["body"]>({});
  const [param, setParam] = React.useState<CommonSpaceInterface["param"]>({});

  const props = { agreement, setAgreement, body, setBody, param, setParam };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "공용공간 비정기사용", path: "/common-space" }]}
        title="공용공간 비정기사용"
      />
      {agreement ? (
        <CommonSpaceInfoFrame {...props} />
      ) : (
        <CommonSpaceNoticeFrame
          agreement={agreement}
          setAgreement={setAgreement}
        />
      )}
    </FlexWrapper>
  );
};

export default CommonSpaceMainFrame;
