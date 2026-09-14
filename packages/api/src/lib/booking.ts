import { supabase } from "./supabaseClient";

export type CreateBookingInput = {
  pet_id: number;
  reservation_date: string;
  time_slot: string;
  duration_minutes: number;
};

export type Booking = {
  booking_id: number;
  reservation_date: string;
  time_slot: string | null;
  duration_minutes: number | null;
  status: string;
  created_at: string;

  pet: {
    pet_id: number;
    name: string;
    breed: string | null;
    image_url: string | null;
  } | null;
};

export async function createBooking(input: CreateBookingInput) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("You must be signed in to book a pet.");
  }

  if (
    input.duration_minutes < 60 ||
    input.duration_minutes % 15 !== 0
  ) {
    throw new Error("Invalid booking duration.");
  }

  const { data, error } = await supabase
    .from("booking")
    .insert({
      user_id: user.id,
      pet_id: input.pet_id,
      reservation_date: input.reservation_date,
      time_slot: input.time_slot,
      duration_minutes: input.duration_minutes,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getBookings(): Promise<Booking[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be signed in to view your bookings.");
  }

  const { data, error } = await supabase
    .from("booking")
    .select(`
      booking_id,
      reservation_date,
      time_slot,
      duration_minutes,
      status,
      created_at,
      pet (
        pet_id,
        name,
        breed,
        image_url
      )
    `)
    .eq("user_id", user.id)
    .order("reservation_date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((booking) => ({
    ...booking,
    pet: Array.isArray(booking.pet)
      ? booking.pet[0] ?? null
      : booking.pet ?? null,
  }));
}