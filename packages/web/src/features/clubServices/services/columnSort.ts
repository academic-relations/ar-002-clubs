import {
  ManageClubActivityCertificateData,
  ManageClubCommonSpaceData,
  ManageClubPrintingBusinessData,
  ManageClubRentalBusinessData,
} from "../types/ManageClubTable";
import {
  activityCertificateStepOrder,
  commonSpaceStepOrder,
  printingBusinessStepOrder,
  rentalBusinessStepOrder,
} from "../types/ManageClubTableConst";
import {
  activityCertificateHeaders,
  commonSpaceHeaders,
  printingBusinessHeaders,
  rentalBusinessHeaders,
} from "../types/ManageClubTableHeader";

export const rentalBusinessColumnSort =
  (headerName: string) =>
  (a: ManageClubRentalBusinessData, b: ManageClubRentalBusinessData) => {
    switch (headerName) {
      case rentalBusinessHeaders[0].headerName:
        return (
          rentalBusinessStepOrder.indexOf(a.status) -
            rentalBusinessStepOrder.indexOf(b.status) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case rentalBusinessHeaders[1].headerName:
        return b.submitTime.getTime() - a.submitTime.getTime();
      case rentalBusinessHeaders[2].headerName:
        return (
          a.name.localeCompare(b.name) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case rentalBusinessHeaders[4].headerName:
        return (
          b.rentTime.getTime() - a.rentTime.getTime() ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );

      case rentalBusinessHeaders[5].headerName:
        return (
          b.returnTime.getTime() - a.returnTime.getTime() ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );

      default:
        return b.submitTime.getTime() - a.submitTime.getTime();
    }
  };

export const printingBusinessColumnSort =
  (headerName: string) =>
  (a: ManageClubPrintingBusinessData, b: ManageClubPrintingBusinessData) => {
    switch (headerName) {
      case printingBusinessHeaders[0].headerName:
        return (
          printingBusinessStepOrder.indexOf(a.status) -
            printingBusinessStepOrder.indexOf(b.status) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case printingBusinessHeaders[1].headerName:
        return b.submitTime.getTime() - a.submitTime.getTime();
      case printingBusinessHeaders[2].headerName:
        return (
          a.name.localeCompare(b.name) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case printingBusinessHeaders[4].headerName:
        return (
          b.receiveTime.getTime() - a.receiveTime.getTime() ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      default:
        return b.submitTime.getTime() - a.submitTime.getTime();
    }
  };

export const activityCertificateColumnSort =
  (headerName: string) =>
  (
    a: ManageClubActivityCertificateData,
    b: ManageClubActivityCertificateData,
  ) => {
    switch (headerName) {
      case activityCertificateHeaders[0].headerName:
        return (
          activityCertificateStepOrder.indexOf(a.status) -
            activityCertificateStepOrder.indexOf(b.status) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case activityCertificateHeaders[1].headerName:
        return b.submitTime.getTime() - a.submitTime.getTime();
      case activityCertificateHeaders[2].headerName:
        return (
          a.name.localeCompare(b.name) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      default:
        return b.submitTime.getTime() - a.submitTime.getTime();
    }
  };

export const commonSpaceColumnSort =
  (headerName: string) =>
  (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) => {
    switch (headerName) {
      case commonSpaceHeaders[0].headerName:
        return (
          commonSpaceStepOrder.indexOf(a.status) -
            commonSpaceStepOrder.indexOf(b.status) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case commonSpaceHeaders[1].headerName:
        return b.submitTime.getTime() - a.submitTime.getTime();
      case commonSpaceHeaders[2].headerName:
        return (
          a.name.localeCompare(b.name) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case commonSpaceHeaders[4].headerName:
        return (
          b.reserveTime.getTime() - a.reserveTime.getTime() ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case commonSpaceHeaders[5].headerName:
        return (
          b.reserveStartEndHour.localeCompare(a.reserveStartEndHour) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      case commonSpaceHeaders[6].headerName:
        return (
          b.reserveRoom.localeCompare(a.reserveRoom) ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      default:
        return b.submitTime.getTime() - a.submitTime.getTime();
    }
  };
