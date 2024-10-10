// import React from "react";

// import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
// import { RentalLimitProps } from "@sparcs-clubs/web/features/rental-business/frames/RentalNoticeFrame";

// const HandCart: React.FC<RentalLimitProps> = ({
//   availableRentals,
//   formCtx,
// }) => {
//   const rolltainerLimit =
//     availableRentals?.objects.find(item => item.name === "Hand Cart Rolltainer")
//       ?.maximum ?? 0;
//   const largeLimit =
//     availableRentals?.objects.find(item => item.name === "Hand Cart Large")
//       ?.maximum ?? 0;
//   const mediumLimit =
//     availableRentals?.objects.find(item => item.name === "Hand Cart Medium")
//       ?.maximum ?? 0;
//   const smallLimit =
//     availableRentals?.objects.find(item => item.name === "Hand Cart Small")
//       ?.maximum ?? 0;

//   return (
//     <>
//       <ItemNumberInput
//         label="롤테이너 개수"
//         placeholder="0개"
//         itemLimit={rolltainerLimit}
//         value={
//           rental?.handCart?.rolltainer
//             ? String(rental?.handCart?.rolltainer)
//             : undefined
//         }
//         handleChange={value =>
//           setRental({
//             ...rental,
//             handCart: {
//               ...rental.handCart,
//               rolltainer: Number(value),
//             },
//           })
//         }
//         setErrorStatus={setRolltainerError}
//       />
//       <ItemNumberInput
//         label="대형 개수"
//         placeholder="0개"
//         itemLimit={largeLimit}
//         value={
//           rental?.handCart?.large ? String(rental?.handCart?.large) : undefined
//         }
//         handleChange={value =>
//           setRental({
//             ...rental,
//             handCart: {
//               ...rental.handCart,
//               large: Number(value),
//             },
//           })
//         }
//         setErrorStatus={setLargeError}
//       />
//       <ItemNumberInput
//         label="중형 개수"
//         placeholder="0개"
//         itemLimit={mediumLimit}
//         value={
//           rental?.handCart?.medium
//             ? String(rental?.handCart?.medium)
//             : undefined
//         }
//         handleChange={value =>
//           setRental({
//             ...rental,
//             handCart: {
//               ...rental.handCart,
//               medium: Number(value),
//             },
//           })
//         }
//         setErrorStatus={setMediumError}
//       />
//       <ItemNumberInput
//         label="소형 개수"
//         placeholder="0개"
//         itemLimit={smallLimit}
//         value={
//           rental?.handCart?.small ? String(rental?.handCart?.small) : undefined
//         }
//         handleChange={value =>
//           setRental({
//             ...rental,
//             handCart: {
//               ...rental.handCart,
//               small: Number(value),
//             },
//           })
//         }
//         setErrorStatus={setSmallError}
//       />
//     </>
//   );
// };

// export default HandCart;
