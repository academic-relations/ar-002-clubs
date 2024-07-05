import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
// import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
// import Typography from "@sparcs-clubs/web/common/components/Typography";

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
            {/* TODO: 지출 일자, 지출 금액 해당 컴포넌트로 구현 */}
            <FlexWrapper direction="column" gap={4} style={{ width: "100%" }}>
              {/* <Typography
                ff="PRETENDARD"
                fw="MEDIUM"
                fs={16}
                lh={20}
                color="BLACK"
              >
                지출 일자
              </Typography>
              <DateInput date={new Date()} /> */}
              <TextInput label="지출 일자" placeholder="20XX.XX.XX" />
            </FlexWrapper>
            <TextInput label="지출 금액" placeholder="금액을 입력해주세요" />
          </FlexWrapper>
        </Card>
      )}
    </FlexWrapper>
  );
};
export default FundingInfoFrame;
