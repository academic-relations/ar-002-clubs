import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const Tool: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
  const { control, getValues } = formCtx;

  const powerDrillLimit =
    availableRentals?.objects.find(item => item.name === "Power Drill Set")
      ?.maximum ?? 0;
  const driverLimit =
    availableRentals?.objects.find(item => item.name === "Driver Set")
      ?.maximum ?? 0;
  const superGlueLimit =
    availableRentals?.objects.find(item => item.name === "Super Glue")
      ?.maximum ?? 0;
  const nipperLimit =
    availableRentals?.objects.find(item => item.name === "Nipper")?.maximum ??
    0;
  const plierLimit =
    availableRentals?.objects.find(item => item.name === "Plier")?.maximum ?? 0;
  const longNosePlierLimit =
    availableRentals?.objects.find(item => item.name === "Long Nose Plier")
      ?.maximum ?? 0;

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
            itemLimit={powerDrillLimit}
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
            itemLimit={driverLimit}
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
            itemLimit={superGlueLimit}
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
            itemLimit={nipperLimit}
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
            itemLimit={plierLimit}
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
            itemLimit={longNosePlierLimit}
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
