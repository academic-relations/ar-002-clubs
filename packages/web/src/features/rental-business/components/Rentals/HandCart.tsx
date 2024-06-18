import React from "react";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

const HandCart: React.FC<RentalLimitProps> = ({
  rentalDate,
  returnDate,
  rental,
  setRental,
}) => {
  const { data, isLoading, isError } = useGetAvailableRentals(
    rentalDate,
    returnDate,
  );

  const rolltainerLimit =
    data?.objects.find(item => item.name === "Hand Cart Rolltainer")?.maximum ??
    0;
  const largeLimit =
    data?.objects.find(item => item.name === "Hand Cart Large")?.maximum ?? 0;
  const mediumLimit =
    data?.objects.find(item => item.name === "Hand Cart Medium")?.maximum ?? 0;
  const smallLimit =
    data?.objects.find(item => item.name === "Hand Cart Small")?.maximum ?? 0;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <ItemNumberInput
        label="롤테이너 개수"
        placeholder="0개"
        itemLimit={rolltainerLimit}
        value={
          rental?.handCart?.rolltainer
            ? String(rental?.handCart?.rolltainer)
            : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            handCart: {
              ...rental.handCart,
              rolltainer: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="대형 개수"
        placeholder="0개"
        itemLimit={largeLimit}
        value={
          rental?.handCart?.large ? String(rental?.handCart?.large) : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            handCart: {
              ...rental.handCart,
              large: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="중형 개수"
        placeholder="0개"
        itemLimit={mediumLimit}
        value={
          rental?.handCart?.medium
            ? String(rental?.handCart?.medium)
            : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            handCart: {
              ...rental.handCart,
              medium: Number(value),
            },
          })
        }
      />
      <ItemNumberInput
        label="소형 개수"
        placeholder="0개"
        itemLimit={smallLimit}
        value={
          rental?.handCart?.small ? String(rental?.handCart?.small) : undefined
        }
        handleChange={value =>
          setRental({
            ...rental,
            handCart: {
              ...rental.handCart,
              small: Number(value),
            },
          })
        }
      />
    </AsyncBoundary>
  );
};

export default HandCart;
