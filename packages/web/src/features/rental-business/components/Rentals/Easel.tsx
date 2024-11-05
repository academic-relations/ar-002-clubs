import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Easel: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const easelLimit =
    availableRentals?.objects.find(item => item.name === "Easel")?.maximum ?? 0;

  return (
    <FormController
      name="easel"
      control={formCtx.control}
      renderItem={props => (
        // TODO: 단위 붙는 것 수정
        <ItemNumberInput
          {...props}
          label="이젤 개수"
          placeholder="0개"
          itemLimit={easelLimit}
          value={
            formCtx.getValues("easel")
              ? String(formCtx.getValues("easel"))
              : undefined
          }
        />
      )}
    />
  );
};

export default Easel;
