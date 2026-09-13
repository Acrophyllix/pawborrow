import { supabase } from "./supabaseClient";

export type CreateBookingInput = {
  pet_id: number;
  reservation_date: string;
  time_slot: string;
  duration_hours: number;
};

export async function createBooking(
  input: CreateBookingInput
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error(
      "You must be signed in to book a pet."
    );
  }

  const { data, error } = await supabase
    .from("booking")
    .insert({
      user_id: user.id,
      pet_id: input.pet_id,
      reservation_date: input.reservation_date,
      time_slot: input.time_slot,
      duration_hours: input.duration_hours,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}