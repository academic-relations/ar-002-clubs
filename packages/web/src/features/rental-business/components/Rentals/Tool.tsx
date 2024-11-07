import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { getMaxRental } from "@sparcs-clubs/web/utils/getMaxRental";

const Tool: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const { control, getValues } = formCtx;

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
            value={
              getValues("tool.powerDrill")
                ? getValues("tool.powerDrill")
                : undefined
            }
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
            value={
              getValues("tool.driver") ? getValues("tool.driver") : undefined
            }
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
            value={
              getValues("tool.superGlue")
                ? getValues("tool.superGlue")
                : undefined
            }
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
            value={
              getValues("tool.nipper") ? getValues("tool.nipper") : undefined
            }
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
            value={
              getValues("tool.plier") ? getValues("tool.plier") : undefined
            }
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
            value={
              getValues("tool.longNosePlier")
                ? getValues("tool.longNosePlier")
                : undefined
            }
          />
        )}
      />
    </>
  );
};

export default Tool;
