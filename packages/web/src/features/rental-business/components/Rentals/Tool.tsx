import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { getMaxRental } from "@sparcs-clubs/web/features/rental-business/utils/getMaxRental";

const Tool: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const { control } = formCtx;

  return (
    <>
      <FormController
        name="tool.powerDrill"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="전동 드릴 세트 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Power Drill")}
          />
        )}
      />
      <FormController
        name="tool.driver"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="드라이버 세트 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Driver")}
          />
        )}
      />
      <FormController
        name="tool.superGlue"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="순간접착제 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Super Glue")}
          />
        )}
      />
      <FormController
        name="tool.nipper"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="니퍼 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Nipper")}
          />
        )}
      />
      <FormController
        name="tool.plier"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="펜치 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Plier")}
          />
        )}
      />
      <FormController
        name="tool.longNosePlier"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="롱노우즈 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Long Nose Plier")}
          />
        )}
      />
    </>
  );
};

export default Tool;
