import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { getMaxRental } from "@sparcs-clubs/web/utils/getMaxRental";

const HandCart: React.FC<RentalLimitProps> = ({
  availableRentals,
  formCtx,
}) => {
  const { control } = formCtx;

  return (
    <>
      <FormController
        name="handCart.rolltainer"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="롤테이너 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Hand Cart Rolltainer")}
          />
        )}
      />
      <FormController
        name="handCart.large"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="대형 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Hand Cart Large")}
          />
        )}
      />
      <FormController
        name="handCart.medium"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="중형 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Hand Cart Medium")}
          />
        )}
      />
      <FormController
        name="handCart.small"
        control={control}
        renderItem={props => (
          <ItemNumberInput
            {...props}
            label="소형 개수"
            placeholder="0개"
            itemLimit={getMaxRental(availableRentals, "Hand Cart Small")}
          />
        )}
      />
    </>
  );
};

export default HandCart;
