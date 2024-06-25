import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";

const HandCart: React.FC<RentalLimitProps> = ({
  rentalDate,
  returnDate,
  rental,
  setRental,
  setHasError,
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

  const [rolltainerError, setRolltainerError] = useState(false);
  const [largeError, setLargeError] = useState(false);
  const [mediumError, setMediumError] = useState(false);
  const [smallError, setSmallError] = useState(false);

  useEffect(() => {
    const hasError = rolltainerError || largeError || mediumError || smallError;
    setHasError(hasError);
  }, [rolltainerError, largeError, mediumError, smallError, setHasError]);

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
        setErrorStatus={setRolltainerError}
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
        setErrorStatus={setLargeError}
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
        setErrorStatus={setMediumError}
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
        setErrorStatus={setSmallError}
      />
    </AsyncBoundary>
  );
};

export default HandCart;
