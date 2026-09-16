export type BookingDisplayStatus =
  | "pending"
  | "upcoming"
  | "in_progress"
  | "completed"
  | "cancelled";

const TIME_ZONE = "Asia/Manila";

export function getTodayDate(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function getBookingStart(
  reservationDate: string,
  timeSlot: string,
): Date {
  const [hours, minutes] = timeSlot
    .split(":")
    .map(Number);

  return new Date(
    `${reservationDate}T${String(hours).padStart(2, "0")}:${String(
      minutes,
    ).padStart(2, "0")}:00+08:00`,
  );
}

export function getBookingEnd(
  reservationDate: string,
  timeSlot: string,
  durationMinutes: number,
): Date {
  const start = getBookingStart(
    reservationDate,
    timeSlot,
  );

  return new Date(
    start.getTime() +
      durationMinutes * 60 * 1000,
  );
}

export function getBookingDisplayStatus(
  booking: {
    reservation_date: string;
    time_slot: string | null;
    duration_minutes: number | null;
    status: string;
  },
  now = new Date(),
): BookingDisplayStatus {
  const status = booking.status.toLowerCase();

  if (status === "cancelled") {
    return "cancelled";
  }

  if (status === "completed") {
    return "completed";
  }

  if (status === "pending") {
    return "pending";
  }

  if (status !== "confirmed") {
    return "upcoming";
  }

  if (!booking.time_slot || !booking.duration_minutes) {
    return "upcoming";
  }

  const start = getBookingStart(
    booking.reservation_date,
    booking.time_slot,
  );

  const end = getBookingEnd(
    booking.reservation_date,
    booking.time_slot,
    booking.duration_minutes,
  );

  if (now < start) {
    return "upcoming";
  }

  if (now >= start && now < end) {
    return "in_progress";
  }

  return "completed";
}