import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Pet } from "@repo/api";
import "@/styles/PetBookingModal.css";

interface Props {
  pet: Pet | null;
  onClose: () => void;
}

export default function PetBookingModal({
  pet,
  onClose,
}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (!pet) {
    return null;
  }

  const hourlyRate = pet.hourlyRate;

  const isAvailable = pet.status === "available";
  const isBooked = pet.status === "booked";

  function handleBookNow() {
    /*
     * Extra protection.
     *
     * Even if somebody somehow opens this modal for
     * a booked/unavailable pet, don't navigate.
     */
    if (!isAvailable) {
      return;
    }

    navigate("/booking", {
      state: {
        pet,
      },
    });

    onClose();
  }

  return (
    <div
      className="pet-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="pet-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="pet-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        {pet.image && (
          <div className="pet-modal-image">
            <img
              src={pet.image}
              alt={pet.name}
            />
          </div>
        )}

        <div className="pet-modal-details">
          <p className="pet-modal-eyebrow">
            {pet.category}
          </p>

          <h2>{pet.name}</h2>

          <p className="pet-modal-breed">
            {pet.breed || "Unknown breed"}
          </p>

          <p className="pet-modal-price">
            ₱{hourlyRate.toLocaleString()}.00 / hour
          </p>

          {/* STATUS */}
          <div className="mt-3">
            {isAvailable ? (
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                Available
              </span>
            ) : isBooked ? (
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                Currently Booked
              </span>
            ) : (
              <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600">
                Currently Unavailable
              </span>
            )}
          </div>

          {pet.personality?.length > 0 && (
            <div className="pet-modal-tags">
              {pet.personality.map((trait) => (
                <span
                  key={trait}
                  className="pet-modal-tag"
                >
                  {trait}
                </span>
              ))}
            </div>
          )}

          {/* BOOK BUTTON */}
          {isAvailable ? (
            <>
              <button
                type="button"
                className="pet-modal-book-btn"
                onClick={handleBookNow}
              >
                Book Now
              </button>

              <p className="pet-modal-availability">
                ✓ Available for booking
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                className="pet-modal-book-btn disabled"
                disabled
              >
                {isBooked
                  ? "Currently Booked"
                  : "Currently Unavailable"}
              </button>

              <p className="pet-modal-unavailable">
                {isBooked
                  ? "✕ This pet is currently booked."
                  : "✕ This pet is currently unavailable."}
              </p>
            </>
          )}

          <p className="pet-modal-description">
            {pet.name}
            {pet.breed
              ? `, known for being `
              : " is "}
            {pet.personality?.length
              ? pet.personality.join(" and ").toLowerCase()
              : "friendly and caring"}
            .

            {" "}

            Every booking includes a food bowl,
            bed, and care instructions — just pick
            your date, start time, and duration.
          </p>
        </div>
      </div>
    </div>
  );
}