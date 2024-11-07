import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { getMaxRental } from "@sparcs-clubs/web/utils/getMaxRental";

const Mat: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const { control, getValues } = formCtx;

  return (
    <FormController
      name="mat"
      control={control}
      renderItem={props => (
        <ItemNumberInput
          {...props}
          label="돗자리 개수"
          placeholder="0개"
          itemLimit={getMaxRental(availableRentals, "Mat")}
          value={getValues("mat") ? getValues("mat") : undefined}
        />
      )}
    />
  );
};

export default Mat;
