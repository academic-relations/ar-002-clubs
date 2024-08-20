import { useGetEvents } from "../features/clubDetails/services/getEvent";

// [isLoading, isResisteringPeriod]를 [boolean, boolean] 형태의 리스트로 반환합니다.

export const useCheckResisteringPeriod = (): [boolean, boolean] => {
  const { data, error, isLoading } = useGetEvents();

  if (isLoading) {
    return [false, true];
  }

  if (error) {
    return [false, false];
  }

  if (!data) {
    return [false, false];
  }

  const currentDate = new Date();

  const matchingEvent = data.events.find(
    (event: { endTerm: Date; startTerm: Date }) =>
      currentDate <= event.endTerm && currentDate >= event.startTerm,
  );

  if (matchingEvent?.registrationEventEnumId === 1) {
    return [true, false];
  }
  return [false, false];
};
