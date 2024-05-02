import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Info from "@sparcs-clubs/web/common/components/Info";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";

import FileUpload from "@sparcs-clubs/web/features/printing-business/component/FileUpload";

import { formSecondInfoText } from "@sparcs-clubs/web/constants/printingBusiness";

import { PromotionalPrintingSizeEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";
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
        <ItemNumberInput
          label="A3"
          placeholder="A3 크기로 인쇄하고 싶은 매수를 적어 주세요"
          itemLimit={45}
          unit="매"
          value={requestForm?.orders?.at(0)?.numberOfPrints.toString() ?? "0"}
          handleChange={value => {
            setRequestForm({
              ...requestForm,
              orders: [
                {
                  promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
                  numberOfPrints: Number(value),
                },
                requestForm?.orders?.at(1) ?? {
                  promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
                  numberOfPrints: 0,
                },
              ],
            });
          }}
        />
        <ItemNumberInput
          label="A4"
          placeholder="A4 크기로 인쇄하고 싶은 매수를 적어 주세요"
          itemLimit={45}
          unit="매"
          value={requestForm?.orders?.at(1)?.numberOfPrints.toString() ?? "0"}
          handleChange={value => {
            setRequestForm({
              ...requestForm,
              orders: [
                requestForm?.orders?.at(1) ?? {
                  promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A3,
                  numberOfPrints: 0,
                },
                {
                  promotionalPrintingSizeEnum: PromotionalPrintingSizeEnum.A4,
                  numberOfPrints: Number(value),
                },
              ],
            });
          }}
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
        <FileUpload />
      </StyledCard>
    </PrintingBusinessFormSecondInner>
  );
};

export default PrintingBusinessFormSecond;
