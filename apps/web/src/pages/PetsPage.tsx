import { useMemo, useState } from "react";
import PetsHero from "../components/PetsHero";
import PetsCategoryRow from "../components/PetsCategoryRow";
import PetsFilterSidebar from "../components/PetsFilterSidebar";
import PetsGrid from "../components/PetsGrid";
import PetsFooter from "../components/PetsFooter";
import { pets } from "../assets/pets";

const PAGE_SIZE = 9;

export default function PetsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Cat");
  const [selectedBreed, setSelectedBreed] = useState("Scottish Fold");
  const [page, setPage] = useState(1);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => pet.breed === selectedBreed);
  }, [selectedBreed]);

  const totalPages = Math.max(1, Math.ceil(filteredPets.length / PAGE_SIZE));

  const visiblePets = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredPets.slice(start, start + PAGE_SIZE);
  }, [filteredPets, page]);

  function handleSelectCategory(label: string) {
    setSelectedCategory(label);
    setPage(1);
  }

  function handleSelectBreed(label: string) {
    setSelectedBreed(label);
    setPage(1);
  }

  return (
    <div className="pets-page">
      <PetsHero />
      <PetsCategoryRow />

      <div className="pets-content">
        <PetsFilterSidebar
          selectedCategory={selectedCategory}
          selectedBreed={selectedBreed}
          onSelectCategory={handleSelectCategory}
          onSelectBreed={handleSelectBreed}
        />
        <PetsGrid
          pets={visiblePets}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalCount={filteredPets.length}
          pageSize={PAGE_SIZE}
        />
      </div>

      <PetsFooter />
    </div>
  );
}