import { TransportationEnum as E } from "@sparcs-clubs/interface/common/enum/funding.enum";

const isParticipantsRequired = (transportation: string | undefined) =>
  transportation === String(E.Taxi) ||
  transportation === String(E.CharterBus) ||
  transportation === String(E.CallVan) ||
  transportation === String(E.Airplane) ||
  transportation === String(E.Ship) ||
  transportation === String(E.Others);

const isPurposeInfoRequired = (transportation: string | undefined) =>
  transportation === String(E.Cargo) ||
  transportation === String(E.CallVan) ||
  transportation === String(E.Airplane) ||
  transportation === String(E.Ship) ||
  transportation === String(E.Others);

export { isParticipantsRequired, isPurposeInfoRequired };
