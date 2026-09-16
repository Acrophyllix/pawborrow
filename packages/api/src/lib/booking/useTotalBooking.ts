import { useQuery } from "@tanstack/react-query";

import { getTotalBookings } from "./booking";

export function useTotalBooking() {
  return useQuery({
    queryKey: ["total-bookings"],
    queryFn: getTotalBookings,
  });
}