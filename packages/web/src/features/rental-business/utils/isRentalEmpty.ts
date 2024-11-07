import { RentalInterface } from "../types/rental";
// TODO: 로직 다시 확인
export const isCurrentItemEmpty = (
  value: "none" | "easel" | "vacuum" | "handCart" | "mat" | "tool",
  currentValues: RentalInterface,
) => {
  switch (value) {
    case "easel":
      return !currentValues.easel || currentValues.easel === 0;
    case "vacuum":
      return !currentValues.vacuum || currentValues.vacuum === undefined;
    case "handCart":
      return (
        (!currentValues.handCart?.rolltainer ||
          currentValues.handCart?.rolltainer === 0) &&
        (!currentValues.handCart?.large ||
          currentValues.handCart?.large === 0) &&
        (!currentValues.handCart?.medium ||
          currentValues.handCart?.medium === 0) &&
        (!currentValues.handCart?.small || currentValues.handCart?.small === 0)
      );
    case "mat":
      return !currentValues.mat || currentValues.mat === 0;
    case "tool":
      return (
        (!currentValues.tool?.powerDrill ||
          currentValues.tool?.powerDrill === 0) &&
        (!currentValues.tool?.driver || currentValues.tool?.driver === 0) &&
        (!currentValues.tool?.superGlue ||
          currentValues.tool?.superGlue === 0) &&
        (!currentValues.tool?.nipper || currentValues.tool?.nipper === 0) &&
        (!currentValues.tool?.plier || currentValues.tool?.plier === 0) &&
        (!currentValues.tool?.longNosePlier ||
          currentValues.tool?.longNosePlier === 0)
      );
    default:
      return true;
  }
};

export const isRentalListEmpty = (currentValues: RentalInterface) =>
  (!currentValues.easel || currentValues.easel === 0) &&
  !currentValues.vacuum &&
  (!currentValues.handCart ||
    (currentValues.handCart.rolltainer === 0 &&
      currentValues.handCart.large === 0 &&
      currentValues.handCart.medium === 0 &&
      currentValues.handCart.small === 0)) &&
  (!currentValues.mat || currentValues.mat === 0) &&
  (!currentValues.tool ||
    (currentValues.tool.powerDrill === 0 &&
      currentValues.tool.driver === 0 &&
      currentValues.tool.superGlue === 0 &&
      currentValues.tool.nipper === 0 &&
      currentValues.tool.plier === 0 &&
      currentValues.tool.longNosePlier === 0));
