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

  function handleBookNow() {
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
        {/* CLOSE BUTTON */}

        <button
          type="button"
          className="pet-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        {/* PET IMAGE */}

        {pet.image && (
          <div className="pet-modal-image">
            <img
              src={pet.image}
              alt={pet.name}
            />
          </div>
        )}

        {/* PET DETAILS */}

        <div className="pet-modal-details">

          <p className="pet-modal-eyebrow">
            {pet.category}
          </p>

          <h2>
            {pet.name}
          </h2>

          <p className="pet-modal-breed">
            {pet.breed || "Unknown breed"}
          </p>

          {/* HOURLY RATE */}

          <p className="pet-modal-price">
            ₱{hourlyRate.toLocaleString()}.00 / hour
          </p>

          {/* PERSONALITY */}

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

          {/* BOOKING BUTTON */}

          <button
            type="button"
            className="pet-modal-book-btn"
            onClick={handleBookNow}
          >
            Book Now
          </button>

          {/* AVAILABILITY */}

          <p className="pet-modal-availability">
            ✓ Available for booking
          </p>

          {/* DESCRIPTION */}

          <p className="pet-modal-description">
            {pet.name}
            {pet.breed
              ? `, known for being `
              : " is "}
            {pet.personality?.length
              ? pet.personality
                  .join(" and ")
                  .toLowerCase()
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