// "use client";

// import React from "react";

// import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
// import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

// const Easel: React.FC<RentalLimitProps> = ({ availableRentals, formCtx }) => {
//   const easelLimit =
//     availableRentals?.objects.find(item => item.name === "Easel")?.maximum ?? 0;

//   return (
//     <ItemNumberInput
//       label="이젤 개수"
//       placeholder="0개"
//       itemLimit={easelLimit}
//       value={rental?.easel ? String(rental.easel) : undefined}
//       handleChange={value =>
//         setRental({
//           ...rental,
//           easel: Number(value),
//         })
//       }
//       setErrorStatus={setHasError}
//     />
//   );
// };

// export default Easel;
