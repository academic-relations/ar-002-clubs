export interface RentalInterface {
  agreement: boolean;
  info?: {
    clubName: string;
    applicant: string;
    phone: string;
  };
  easel?: number;
  vacuum?: "corded" | "cordless";
  handCart?: {
    rolltainer: number;
    large: number;
    medium: number;
    small: number;
  };
  mat?: number;
  tool?: {
    powerDrill: number;
    driver: number;
    superGlue: number;
    nipper: number;
    plier: number;
    longNosePlier: number;
  };
}
