import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PetsCategoryRow from "@/components/layout/Pets/PetsCategoryRow";
import PetsFilterSidebar from "@/components/layout/Pets/PetFilterSidebar";
import PetsGrid from "@/components/layout/Pets/PetGrid";
import ProductsGrid from "@/components/layout/Pets/ProductsGrid";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

import {
  usePets,
  useCategories,
} from "@repo/api";

import {
  products,
  PRODUCT_CATEGORIES,
  ANIMAL_FILTERS,
} from "@/components/layout/Pets/products";

import "@/styles/Pet.css";

const PAGE_SIZE = 9;

export default function PetsPage() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  /*
   * ---------------------------------------------
   * FETCH PETS
   * ---------------------------------------------
   */

  const {
    data: pets = [],
    isLoading: petsLoading,
    isError: petsError,
  } = usePets();

  /*
   * ---------------------------------------------
   * FETCH PET CATEGORIES
   * ---------------------------------------------
   */

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  /*
   * ---------------------------------------------
   * STATE
   * ---------------------------------------------
   */

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl || "Cat");

  const [selectedBreed, setSelectedBreed] =
    useState("");

  const [selectedPersonality, setSelectedPersonality] =
    useState("");

  const [page, setPage] = useState(1);

  /*
   * ---------------------------------------------
   * LOADING / ERROR STATUS
   * ---------------------------------------------
   */

  const isLoading =
    petsLoading || categoriesLoading;

  const isError =
    petsError || categoriesError;

  /*
   * ---------------------------------------------
   * PRODUCT MODE
   * ---------------------------------------------
   *
   * Some categories are products instead of pets.
   */

  const isProductMode =
    PRODUCT_CATEGORIES.includes(
      selectedCategory,
    );

  /*
   * ---------------------------------------------
   * CATEGORY FILTER ITEMS
   * ---------------------------------------------
   *
   * Build the category list from Supabase.
   *
   * Example:
   *
   * Cat        4
   * Dog        6
   * Rabbit     3
   * Guinea Pig 2
   */

  const categoryItems = useMemo(() => {
    return categories.map((category) => ({
      label: category.label,

      count: pets.filter(
        (pet) =>
          pet.category === category.label,
      ).length,
    }));
  }, [categories, pets]);

  /*
   * ---------------------------------------------
   * BREED / ANIMAL FILTER
   * ---------------------------------------------
   *
   * For pets:
   * Get breeds directly from the loaded pets.
   *
   * For products:
   * Use the existing product data.
   */

  const breedItems = useMemo(() => {
    if (isProductMode) {
      return ANIMAL_FILTERS.map((animal) => ({
        label: animal,

        count: products.filter(
          (product) =>
            product.productCategory ===
              selectedCategory &&
            product.animals.includes(animal),
        ).length,
      }));
    }

    /*
     * Get pets belonging to
     * the selected category.
     */

    const categoryPets = pets.filter(
      (pet) =>
        pet.category === selectedCategory,
    );

    /*
     * Count each breed.
     */

    const breedCounts =
      new Map<string, number>();

    categoryPets.forEach((pet) => {
      if (!pet.breed) {
        return;
      }

      breedCounts.set(
        pet.breed,
        (breedCounts.get(pet.breed) ?? 0) + 1,
      );
    });

    return Array.from(
      breedCounts.entries(),
    ).map(([breed, count]) => ({
      label: breed,
      count,
    }));
  }, [
    pets,
    selectedCategory,
    isProductMode,
  ]);

  /*
   * ---------------------------------------------
   * BREED FILTER TITLE
   * ---------------------------------------------
   */

  const breedFilterTitle = isProductMode
    ? "Filter by animal"
    : "Filter by breed";

  /*
   * ---------------------------------------------
   * PERSONALITY FILTER
   * ---------------------------------------------
   *
   * Personality only applies to pets.
   */

  const showPersonality =
    !isProductMode;

  /*
   * ---------------------------------------------
   * FILTER PETS
   * ---------------------------------------------
   */

  const filteredPets = useMemo(() => {
    if (isProductMode) {
      return [];
    }

    return pets.filter((pet) => {
      const matchesCategory =
        pet.category === selectedCategory;

      const matchesBreed =
        !selectedBreed ||
        pet.breed === selectedBreed;

      const matchesPersonality =
        !selectedPersonality ||
        pet.personality.includes(
          selectedPersonality,
        );

      return (
        matchesCategory &&
        matchesBreed &&
        matchesPersonality
      );
    });
  }, [
    pets,
    selectedCategory,
    selectedBreed,
    selectedPersonality,
    isProductMode,
  ]);

  /*
   * ---------------------------------------------
   * FILTER PRODUCTS
   * ---------------------------------------------
   */

  const filteredProducts = useMemo(() => {
    if (!isProductMode) {
      return [];
    }

    return products.filter((product) => {
      const matchesCategory =
        product.productCategory ===
        selectedCategory;

      const matchesAnimal =
        !selectedBreed ||
        product.animals.includes(
          selectedBreed,
        );

      return (
        matchesCategory &&
        matchesAnimal
      );
    });
  }, [
    selectedCategory,
    selectedBreed,
    isProductMode,
  ]);

  /*
   * ---------------------------------------------
   * PAGINATION
   * ---------------------------------------------
   */

  const activeCount = isProductMode
    ? filteredProducts.length
    : filteredPets.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      activeCount / PAGE_SIZE,
    ),
  );

  /*
   * ---------------------------------------------
   * VISIBLE PETS
   * ---------------------------------------------
   */

  const visiblePets = useMemo(() => {
    const start =
      (page - 1) * PAGE_SIZE;

    return filteredPets.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    filteredPets,
    page,
  ]);

  /*
   * ---------------------------------------------
   * VISIBLE PRODUCTS
   * ---------------------------------------------
   */

  const visibleProducts = useMemo(() => {
    const start =
      (page - 1) * PAGE_SIZE;

    return filteredProducts.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    filteredProducts,
    page,
  ]);

  /*
   * ---------------------------------------------
   * CATEGORY SELECTION
   * ---------------------------------------------
   */

  function handleSelectCategory(
    label: string,
  ) {
    setSelectedCategory(label);

    setSelectedBreed("");

    setSelectedPersonality("");

    setPage(1);
  }

  /*
   * ---------------------------------------------
   * BREED SELECTION
   * ---------------------------------------------
   */

  function handleSelectBreed(
    label: string,
  ) {
    setSelectedBreed((previous) =>
      previous === label
        ? ""
        : label,
    );

    setPage(1);
  }

  /*
   * ---------------------------------------------
   * PERSONALITY SELECTION
   * ---------------------------------------------
   */

  function handleSelectPersonality(
    label: string,
  ) {
    setSelectedPersonality((previous) =>
      previous === label
        ? ""
        : label,
    );

    setPage(1);
  }

  /*
   * ---------------------------------------------
   * LOADING
   * ---------------------------------------------
   */

  if (isLoading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading pets...
          </p>
        </main>
      </>
    );
  }

  /*
   * ---------------------------------------------
   * ERROR
   * ---------------------------------------------
   */

  if (isError) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center">
          <p className="text-sm text-red-500">
            Failed to load pets.
          </p>
        </main>
      </>
    );
  }

  /*
   * ---------------------------------------------
   * UI
   * ---------------------------------------------
   */

  return (
    <main>
      <Navbar />

      {/* =========================================
          HERO
      ========================================== */}

      <header className="pets-hero">
        <div className="pets-hero-content">

          <div className="pets-hero-text">

            <span className="eyebrow">
              PawBorrow
            </span>

            <h1>
              Friends come with
              <br />
              four paws
            </h1>

            <p>
              Browse available companions
              ready to share their love.
              Use the filters below to find
              the perfect match and all the
              gear you'll need.
            </p>

          </div>

          <div className="pets-hero-image">

            <div className="hero-blob" />

            <img
              src="/images/hero-pets.png"
              alt="Cat and dog"
            />

          </div>

        </div>
      </header>

      {/* =========================================
          CATEGORY ROW
      ========================================== */}

      <PetsCategoryRow />

      {/* =========================================
          CONTENT
      ========================================== */}

      <div className="pets-content">

        {/* =======================================
            FILTER SIDEBAR
        ======================================== */}

        <PetsFilterSidebar
          categoryItems={categoryItems}

          selectedCategory={
            selectedCategory
          }

          selectedBreed={
            selectedBreed
          }

          selectedPersonality={
            selectedPersonality
          }

          breedItems={
            breedItems
          }

          breedFilterTitle={
            breedFilterTitle
          }

          showPersonality={
            showPersonality
          }

          onSelectCategory={
            handleSelectCategory
          }

          onSelectBreed={
            handleSelectBreed
          }

          onSelectPersonality={
            handleSelectPersonality
          }
        />

        {/* =======================================
            GRID
        ======================================== */}

        {isProductMode ? (
          <ProductsGrid
            products={
              visibleProducts
            }

            page={page}

            totalPages={
              totalPages
            }

            onPageChange={
              setPage
            }

            totalCount={
              filteredProducts.length
            }

            pageSize={
              PAGE_SIZE
            }
          />
        ) : (
          <PetsGrid
            pets={
              visiblePets
            }

            page={page}

            totalPages={
              totalPages
            }

            onPageChange={
              setPage
            }

            totalCount={
              filteredPets.length
            }

            pageSize={
              PAGE_SIZE
            }
          />
        )}

      </div>

      <Footer />
    </main>
  );
}