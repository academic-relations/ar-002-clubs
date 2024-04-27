import React from "react";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import { RentalFrameProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

const HandCart: React.FC<RentalFrameProps & { limit?: number }> = ({
  limit = 99,
  rental,
  setRental,
}) => (
  <>
    <ItemNumberInput
      label="롤테이너 개수"
      placeholder="0개"
      itemLimit={limit}
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
      itemLimit={limit}
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
      itemLimit={limit}
      value={
        rental?.handCart?.medium ? String(rental?.handCart?.medium) : undefined
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
      itemLimit={limit}
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
  </>
);

export default HandCart;
