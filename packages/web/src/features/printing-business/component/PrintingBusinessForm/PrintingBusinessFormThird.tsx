import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import { printingBusinessOrderSteps } from "@sparcs-clubs/web/constants/printingBusiness";

import type { PrintingBusinessFormProps } from ".";
import FormCheck from "./_atomic/FormCheck";

interface PrintingBusinessFormThirdProps {
  username: PrintingBusinessFormProps["username"];
  clubs: PrintingBusinessFormProps["clubs"];
  requestParam: PrintingBusinessFormProps["requestParam"];
  requestForm: PrintingBusinessFormProps["requestForm"];
  // setRequestForm: PrintingBusinessFormProps["setRequestForm"];
}

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

const PrintingBusinessFormThird: React.FC<PrintingBusinessFormThirdProps> = ({
  username,
  clubs,
  requestParam,
  requestForm,
  // setRequestForm,
}) => {
  useEffect(() => {}, []);

  return (
    <StyledCard type="outline">
      <FormCheck
        label={printingBusinessOrderSteps[0].label}
        formContents={[
          [
            "동아리",
            `동아리: ${
              clubs.at(requestParam.clubId ?? 0)?.name.toString() ??
              "동아리 선택에 오류가 있습니요, 이전 단계를 검토해주세요"
            }`,
          ],
          ["담당자", `담당: ${username}`],
          [
            "연락처",
            `연락처: ${
              requestForm.krPhoneNumber ||
              "전화번호 입력이 잘 되지 않았어요, 이전 단계를 검토해주세요"
            }`,
          ],
        ]}
      />
      <FormCheck
        label={printingBusinessOrderSteps[1].label}
        formContents={[
          [
            "A3용지",
            `A3용지: ${requestForm.orders?.at(0)?.numberOfPrints ?? 0}매`,
          ],
          [
            "A4용지",
            `A4용지: ${requestForm.orders?.at(1)?.numberOfPrints ?? 0}매`,
          ],
          [
            "기타",
            `색상: ${requestForm.isColorPrint ? "컬러" : "흑백"} / 
            크기: ${requestForm.fitPrintSizeToPaper ? "용지에 맞춤" : "원본 크기 그대로"} / 
            마무리 작업: ${requestForm.requireMarginChopping ? "흰 테두리 재단" : "그대로"}
            `,
          ],
        ]}
      />
      <TextInput
        label="인쇄목적"
        placeholder="인쇄목적을 간단히 적어주세요"
        area
      />
      <TextInput label="수령일" placeholder="달력으로 바꿀거임" area />
    </StyledCard>
  );
};

export default PrintingBusinessFormThird;
