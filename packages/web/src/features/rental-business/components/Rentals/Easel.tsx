import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Easel: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const { control, getValues } = formCtx;
  const easelLimit =
    availableRentals?.objects.find(item => item.name === "Easel")?.maximum ?? 0;

  return (
    <FormController
      name="easel"
      control={control}
      renderItem={props => (
        <ItemNumberInput
          {...props}
          label="이젤 개수"
          placeholder="0개"
          itemLimit={easelLimit}
          value={getValues("easel") ? getValues("easel") : undefined}
        />
      )}
    />
  );
};

export default Easel;
