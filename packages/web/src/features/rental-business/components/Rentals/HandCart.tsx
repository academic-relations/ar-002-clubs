import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const HandCart: React.FC<RentalLimitProps> = ({
  availableRentals,
  formCtx,
}) => {
  const { control, getValues } = formCtx;

  const rolltainerLimit =
    availableRentals?.objects.find(item => item.name === "Hand Cart Rolltainer")
      ?.maximum ?? 0;
  const largeLimit =
    availableRentals?.objects.find(item => item.name === "Hand Cart Large")
      ?.maximum ?? 0;
  const mediumLimit =
    availableRentals?.objects.find(item => item.name === "Hand Cart Medium")
      ?.maximum ?? 0;
  const smallLimit =
    availableRentals?.objects.find(item => item.name === "Hand Cart Small")
      ?.maximum ?? 0;

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
            itemLimit={rolltainerLimit}
            value={
              getValues("handCart.rolltainer")
                ? getValues("handCart.rolltainer")
                : undefined
            }
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
            itemLimit={largeLimit}
            value={
              getValues("handCart.large")
                ? getValues("handCart.large")
                : undefined
            }
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
            itemLimit={mediumLimit}
            value={
              getValues("handCart.medium")
                ? getValues("handCart.medium")
                : undefined
            }
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
            itemLimit={smallLimit}
            value={
              getValues("handCart.small")
                ? getValues("handCart.small")
                : undefined
            }
          />
        )}
      />
    </>
  );
};

export default HandCart;
