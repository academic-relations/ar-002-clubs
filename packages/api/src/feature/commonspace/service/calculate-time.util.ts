import { Reservation } from "../dto/common-space.dto";

export function getDayRange(date: Date): { dayStart: Date; dayEnd: Date } {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  return { dayStart, dayEnd };
}

export function getWeekRange(date: Date): { weekStart: Date; weekEnd: Date } {
  const dayOfWeek = date.getDay();
  const diffToMonday = (dayOfWeek + 6) % 7;

  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - diffToMonday);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return { weekStart, weekEnd };
}

export function calculateMinutes(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / (60 * 1000);
}

export function splitReservationByDay(start: Date, end: Date): Reservation[] {
  const reservations: Reservation[] = [];
  let currentStart = new Date(start);
  let currentEnd = new Date(start);
  currentEnd.setHours(23, 59, 59, 999);

  while (currentStart < end) {
    if (currentEnd > end) {
      currentEnd = new Date(end);
    }

    reservations.push({
      start: new Date(currentStart),
      end: new Date(currentEnd),
    });

    currentStart = new Date(currentEnd);
    currentStart.setHours(0, 0, 0, 0);
    currentStart.setDate(currentStart.getDate() + 1);
    currentEnd = new Date(currentStart);
    currentEnd.setHours(23, 59, 59, 999);
  }

  return reservations;
}

export function splitReservationByWeek(start: Date, end: Date): Reservation[] {
  const reservations: Reservation[] = [];
  let currentStart = new Date(start);
  let currentEnd = getWeekRange(currentStart).weekEnd;

  while (currentStart < end) {
    if (currentEnd > end) {
      currentEnd = new Date(end);
    }

    reservations.push({
      start: new Date(currentStart),
      end: new Date(currentEnd),
    });

    currentStart = new Date(currentEnd);
    currentStart.setHours(0, 0, 0, 0);
    currentStart.setDate(currentStart.getDate() + 1);
    currentEnd = getWeekRange(currentStart).weekEnd;
  }

  return reservations;
}

export function canMakeReservation(
  startTerm: Date,
  endTerm: Date,
  existingReservations: Reservation[],
  availableHoursPerDay: number,
  availableHoursPerWeek: number,
): boolean {
  const newReservationsByDay = splitReservationByDay(startTerm, endTerm);
  const newReservationsByWeek = splitReservationByWeek(startTerm, endTerm);

  const dailyLimitExceeded = newReservationsByDay.some(newRes => {
    const { dayStart, dayEnd } = getDayRange(newRes.start);

    const dailyMinutes =
      existingReservations.reduce((total, res) => {
        if (res.start <= dayEnd && res.end >= dayStart) {
          const overlapStart = res.start < dayStart ? dayStart : res.start;
          const overlapEnd = res.end > dayEnd ? dayEnd : res.end;
          return total + calculateMinutes(overlapStart, overlapEnd);
        }
        return total;
      }, 0) + calculateMinutes(newRes.start, newRes.end);

    return dailyMinutes > availableHoursPerDay;
  });

  if (dailyLimitExceeded) {
    return false;
  }

  const weeklyLimitExceeded = newReservationsByWeek.some(newRes => {
    const { weekStart, weekEnd } = getWeekRange(newRes.start);

    const weeklyMinutes =
      existingReservations.reduce((total, res) => {
        if (res.start <= weekEnd && res.end >= weekStart) {
          const overlapStart = res.start < weekStart ? weekStart : res.start;
          const overlapEnd = res.end > weekEnd ? weekEnd : res.end;
          return total + calculateMinutes(overlapStart, overlapEnd);
        }
        return total;
      }, 0) + calculateMinutes(newRes.start, newRes.end);

    return weeklyMinutes > availableHoursPerWeek;
  });

  if (weeklyLimitExceeded) {
    return false;
  }

  return true;
}
