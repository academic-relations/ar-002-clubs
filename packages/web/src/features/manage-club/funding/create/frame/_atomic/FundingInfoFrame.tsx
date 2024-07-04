import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

const FundingInfoFrame = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="지원금 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <Card outline style={{ marginLeft: 24 }}>
          <TextInput label="항목명" placeholder="항목명을 입력하세요" />
          <FlexWrapper direction="row" gap={32}>
            <Select items={[]} label="지출 목적" />
            {/* TODO: dateInput */}
            {/* TODO: 지출 금액 입력 */}
          </FlexWrapper>
        </Card>
      )}
    </FlexWrapper>
  );
};
export default FundingInfoFrame;
