import React, { useEffect, useState } from "react";

import { setHours } from "date-fns";

import Card from "@sparcs-clubs/web/common/components/Card";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import { printingBusinessOrderSteps } from "@sparcs-clubs/web/constants/printingBusiness";
import DesiredPickUpTimeSelection from "@sparcs-clubs/web/features/printing-business/component/DesiredPickUpTimeSelection/DesiredPickUpTimeSelection";
import { mockExistDates } from "@sparcs-clubs/web/features/rental-business/frames/RentalInfoFrame/_atomic/mockExistDate";

import FormCheck from "./_atomic/FormCheck";

import type { PrintingBusinessFormProps } from ".";

type PrintingBusinessFormThirdProps = Pick<
  PrintingBusinessFormProps,
  "username" | "clubs" | "requestParam" | "requestForm" | "setRequestForm"
> & { setFormError: React.Dispatch<React.SetStateAction<boolean>> };

const PrintingBusinessFormThird: React.FC<PrintingBusinessFormThirdProps> = ({
  username,
  clubs,
  requestParam,
  requestForm,
  setRequestForm,
  setFormError,
}) => {
  const [printingPurpose, setPrintingPurpose] = useState<string>("");
  useEffect(() => {
    setRequestForm({
      ...requestForm,
      printingPurpose,
    });
    setFormError(printingPurpose.length === 0 || printingPurpose.length >= 512);
  }, [printingPurpose]);

  return (
    <Card outline gap={20}>
      <FormCheck
        label={printingBusinessOrderSteps[0].label}
        formContents={[
          [
            "동아리",
            `동아리: ${
              clubs.at(requestParam.clubId ?? 0)?.name.toString() ??
              "동아리 선택에 오류가 있습니다. 이전 단계를 검토해주세요"
            }`,
          ],
          ["담당자", `담당: ${username}`],
          [
            "연락처",
            `연락처: ${
              requestForm.krPhoneNumber ||
              "전화번호 입력에 오류가 있습니다. 이전 단계를 검토해주세요"
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
        value={requestForm.printingPurpose}
        handleChange={setPrintingPurpose}
        errorMessage={
          requestForm.printingPurpose?.length === 0
            ? "필수로 채워야 하는 항목입니다."
            : ""
        }
        area
      />
      <DesiredPickUpTimeSelection
        label="수령일"
        executiveWorkDates={mockExistDates}
        value={requestForm.desiredPickUpTime ?? setHours(new Date(), 21)}
        onDateChange={date =>
          setRequestForm({
            ...requestForm,
            desiredPickUpTime: date,
          })
        }
      />
    </Card>
  );
};

export default PrintingBusinessFormThird;
