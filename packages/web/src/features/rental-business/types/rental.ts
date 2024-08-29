export interface RentalInterface {
  agreement: boolean;
  info?: {
    clubId?: number;
    clubName?: string;
    applicant?: string;
    phone?: string;
  };
  date?: {
    start?: Date;
    end?: Date;
  };
  easel?: number;
  vacuum?: "corded" | "cordless";
  handCart?: {
    rolltainer?: number;
    large?: number;
    medium?: number;
    small?: number;
  };
  mat?: number;
  tool?: {
    powerDrill?: number;
    driver?: number;
    superGlue?: number;
    nipper?: number;
    plier?: number;
    longNosePlier?: number;
  };
  purpose?: string;
}
