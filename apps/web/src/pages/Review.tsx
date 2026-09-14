import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "@/styles/Review.css";

interface LocationState {
  booking?: {
    booking_id: string;
    pet?: {
      name?: string;
      breed?: string;
      image_url?: string;
    };
  };
}

export default function ReviewPage() {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as LocationState) || {};
  const booking = state.booking;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      // TODO: replace with your actual review mutation, e.g.:
      // await createReview({ bookingId, rating, comment });
      console.log({ bookingId, rating, comment });
      navigate("/bookings");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="review-page">
        <div className="review-card">
          <h1>Leave a Review</h1>
          <p className="review-subtext">
            Tell us about your experience booking{" "}
            {booking?.pet?.name ?? "this pet"}.
          </p>

          {booking?.pet && (
            <div className="review-pet-preview">
              <img
                src={booking.pet.image_url ?? "/images/pet-placeholder.jpg"}
                alt={booking.pet.name ?? "Pet"}
              />
              <div>
                <h4>{booking.pet.name}</h4>
                <p>{booking.pet.breed}</p>
              </div>
            </div>
          )}

          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="review-star-btn"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  size={32}
                  fill={(hoverRating || rating) >= star ? "#f16c6c" : "none"}
                  color="#f16c6c"
                />
              </button>
            ))}
          </div>

          <label className="review-label" htmlFor="review-comment">
            Your review
          </label>
          <textarea
            id="review-comment"
            className="review-textarea"
            placeholder="How was your experience?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="review-submit-btn"
            onClick={handleSubmit}
            disabled={rating === 0 || submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}