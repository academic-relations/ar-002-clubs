import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const AddEvidenceFrame = () => {
  const [toggle, setToggle] = useState(true);

  // TODO: 코드 좀 더 예쁘게 바꾸기
  const [productChecked, setProductChecked] = useState(false);
  const [fixedChecked, setfixedChecked] = useState(false);
  const [transportChecked, settransportChecked] = useState(false);
  const [nonCorpChecked, setnonCorpChecked] = useState(false);
  const [foodChecked, setfoodChecked] = useState(false);
  const [laborChecked, setlaborChecked] = useState(false);
  const [externalChecked, setexternalChecked] = useState(false);
  const [publChecked, setpublChecked] = useState(false);
  const [profitChecked, setprofitChecked] = useState(false);
  const [jointChecked, setjointChecked] = useState(false);
  const [etcChecked, setetcChecked] = useState(false);

  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="추가 증빙"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <FlexWrapper direction="column" gap={40}>
          <Card outline style={{ marginLeft: 24 }}>
            <FlexWrapper direction="column" gap={16}>
              <Typography
                ff="PRETENDARD"
                fw="MEDIUM"
                fs={16}
                lh={20}
                color="BLACK"
              >
                추가 증빙 분류
              </Typography>
              <FlexWrapper direction="column" gap={12}>
                <CheckboxOption
                  optionText="물품"
                  checked={productChecked}
                  onClick={() => setProductChecked(!productChecked)}
                />
                <CheckboxOption
                  optionText="비품"
                  checked={fixedChecked}
                  onClick={() => setfixedChecked(!fixedChecked)}
                />
                <CheckboxOption
                  optionText="교통비"
                  checked={transportChecked}
                  onClick={() => settransportChecked(!transportChecked)}
                />
                <CheckboxOption
                  optionText="비법인 거래"
                  checked={nonCorpChecked}
                  onClick={() => setnonCorpChecked(!nonCorpChecked)}
                />
                <CheckboxOption
                  optionText="식비"
                  checked={foodChecked}
                  onClick={() => setfoodChecked(!foodChecked)}
                />
                <CheckboxOption
                  optionText="근로 계약"
                  checked={laborChecked}
                  onClick={() => setlaborChecked(!laborChecked)}
                />
                <CheckboxOption
                  optionText="외부 행사 참가비"
                  checked={externalChecked}
                  onClick={() => setexternalChecked(!externalChecked)}
                />
                <CheckboxOption
                  optionText="발간물"
                  checked={publChecked}
                  onClick={() => setpublChecked(!publChecked)}
                />
                <CheckboxOption
                  optionText="수익 사업"
                  checked={profitChecked}
                  onClick={() => setprofitChecked(!profitChecked)}
                />
                <CheckboxOption
                  optionText="공동 경비"
                  checked={jointChecked}
                  onClick={() => setjointChecked(!jointChecked)}
                />
                <CheckboxOption
                  optionText="기타"
                  checked={etcChecked}
                  onClick={() => setetcChecked(!etcChecked)}
                />
              </FlexWrapper>
            </FlexWrapper>
          </Card>
          {/* TODO: evidence block 달기 */}
        </FlexWrapper>
      )}
    </FlexWrapper>
  );
};
export default AddEvidenceFrame;