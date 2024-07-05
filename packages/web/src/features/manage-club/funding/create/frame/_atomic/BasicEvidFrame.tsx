import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const BasicEvidFrame = () => {
  const [toggle, setToggle] = useState(true);

  const [tradeDetail, setTradeDetail] = useState<string>("");

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="필수 증빙"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <Card outline style={{ marginLeft: 24 }}>
          <FlexWrapper direction="column" gap={4}>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              거래 사실 증빙
            </Typography>
            <FileUpload placeholder="파일을 선택해주세요" />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={4}>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              거래 세부항목 증빙
            </Typography>
            <TextInput
              placeholder="거래 세부항목 증빙을 입력하세요"
              area
              value={tradeDetail}
              handleChange={setTradeDetail}
            />
            <FileUpload placeholder="파일을 선택해주세요" />
          </FlexWrapper>
        </Card>
      )}
    </FlexWrapper>
  );
};
export default BasicEvidFrame;
