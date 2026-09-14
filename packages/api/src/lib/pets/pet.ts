import { supabase } from "../supabaseClient";

export type Pet = {
  id: number;
  name: string;
  breed: string | null;
  category: string;
  personality: string[];
  status: string;
  image: string | null;
  hourlyRate: number;
};

export async function getPets(): Promise<Pet[]> {
  const { data, error } = await supabase
    .from("pet")
    .select(`
      pet_id,
      name,
      breed,
      personality,
      status,
      image_url,
      pet_category (
        category_id,
        category_name,
        hourly_rate
      )
    `)
    .eq("status", "available")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((pet) => {
    const category = Array.isArray(pet.pet_category)
      ? pet.pet_category[0]
      : pet.pet_category;

    return {
      id: pet.pet_id,
      name: pet.name,
      breed: pet.breed,
      category: category?.category_name ?? "Unknown",
      personality: pet.personality ?? [],
      status: pet.status,
      image: pet.image_url,
      hourlyRate: Number(category?.hourly_rate ?? 0),
    };
  });
}