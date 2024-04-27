import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Info from "@sparcs-clubs/web/common/components/Info";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import { formSecondInfoText } from "@sparcs-clubs/web/constants/printingBusiness";

import type { PrintingBusinessFormProps } from ".";
import BinaryRadio from "./_atomic/BinaryRadio";

interface PrintingBusinessFormSecondProps {
  requestForm: PrintingBusinessFormProps["requestForm"];
  setRequestForm: PrintingBusinessFormProps["setRequestForm"];
}

const PrintingBusinessFormSecondInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

const PrintingBusinessFormSecond: React.FC<PrintingBusinessFormSecondProps> = ({
  requestForm,
  setRequestForm,
}) => {
  const [isColorPrint, setIsColorPrint] = useState<boolean>(
    requestForm.isColorPrint ?? true,
  );
  const [fitPrintSizeToPaper, setFitPrintSizeToPaper] = useState<boolean>(
    requestForm.fitPrintSizeToPaper ?? true,
  );
  const [requireMarginChopping, setRequireMarginChopping] = useState<boolean>(
    requestForm.requireMarginChopping ?? false,
  );

  useEffect(() => {
    setRequestForm({
      ...requestForm,
      isColorPrint,
      fitPrintSizeToPaper,
      requireMarginChopping,
    });
  }, [isColorPrint, fitPrintSizeToPaper, requireMarginChopping]);

  return (
    <PrintingBusinessFormSecondInner>
      <Info text={formSecondInfoText} />
      <StyledCard type="outline">
        <Typography>인쇄 매수</Typography>
        <TextInput
          placeholder="신청인의 이름이 자동으로 입력됩니다. 이 안내가 보일 경우 관리자에게 연락해 주세요"
          label="신청자 이름"
          disabled
          value="홍길동"
        />
      </StyledCard>
      <StyledCard type="outline">
        <Typography>인쇄 설정</Typography>
        <BinaryRadio
          firstOptionLabel="컬러"
          secondOptionLabel="흑백"
          isFirstOptionSelected={isColorPrint}
          setIsFirstOptionSelected={setIsColorPrint}
        />
        <BinaryRadio
          firstOptionLabel="용지에 맞춤"
          secondOptionLabel="원본 크기 그대로"
          isFirstOptionSelected={fitPrintSizeToPaper}
          setIsFirstOptionSelected={setFitPrintSizeToPaper}
        />
        <BinaryRadio
          firstOptionLabel="그대로"
          secondOptionLabel="흰 테두리 재단"
          isFirstOptionSelected={!requireMarginChopping}
          setIsFirstOptionSelected={setRequireMarginChopping}
        />
      </StyledCard>
      <StyledCard type="outline">
        <Typography>인쇄 파일 업로드</Typography>
        <TextInput
          placeholder="신청인의 이름이 자동으로 입력됩니다. 이 안내가 보일 경우 관리자에게 연락해 주세요"
          label="신청자 이름"
          disabled
          value="홍길동"
        />
      </StyledCard>
    </PrintingBusinessFormSecondInner>
  );
};

export default PrintingBusinessFormSecond;
