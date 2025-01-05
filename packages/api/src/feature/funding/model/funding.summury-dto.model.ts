export class FundingSummaryDto {
  id: number;

  activityName: string;

  name: string;

  expenditureAmount: number;

  approvedAmount: number;

  fundingOrderStatusEnumId: number;

  purposeId: number;

  constructor(result: {
    id: number;
    activityName: string;
    name: string;
    expenditureAmount: number;
    approvedAmount: number;
    fundingOrderStatusEnumId: number;
    purposeId: number;
  }) {
    Object.assign(this, result);
  }
}
