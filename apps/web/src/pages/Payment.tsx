import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment } from "@repo/api";
import type { Pet } from "@repo/api";

type PaymentState = {
  bookingId: number;
  pet: Pet;

  hours: number;
  startTime: string;
  endTime: string;

  hourlyRate: number;
  total: number;

  reservationDate: string;

  contact: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };
};

function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();

  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] =
    useState("GCash");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const state =
    location.state as PaymentState | null;

  /*
   * If the user visits /payment directly,
   * location.state will be null.
   */
  if (!state) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-card">

            <h2>
              Payment information not found.
            </h2>

            <p>
              Please select a pet and create
              a booking first.
            </p>

            <button
              type="button"
              onClick={() => navigate("/pets")}
            >
              Back to Pets
            </button>

          </div>
        </div>
      </div>
    );
  }

  /*
   * From this point onward, paymentState
   * is guaranteed to exist.
   */
  const paymentState: PaymentState = state;

  const pet = paymentState.pet;

  async function handlePayment() {
    setError("");

    try {
      setLoading(true);

      await createPayment({
        booking_id: paymentState.bookingId,
        amount: paymentState.total,
        payment_method: selectedMethod,
      });

      navigate("/bookings");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create payment."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="payment-page">

      <div className="payment-container">

        <div className="payment-card">

          {/* =========================
              HEADER
          ========================== */}

          <h1>
            Payment
          </h1>

          {/* =========================
              BOOKING INFORMATION
          ========================== */}

          <div className="booking-information">

            <h2>
              {pet.name}
            </h2>

            {pet.breed && (
              <p>
                <strong>Breed:</strong>{" "}
                {pet.breed}
              </p>
            )}

            <p>
              <strong>Category:</strong>{" "}
              {pet.category}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {paymentState.reservationDate}
            </p>

            <p>
              <strong>Start Time:</strong>{" "}
              {formatTime(
                paymentState.startTime
              )}
            </p>

            <p>
              <strong>End Time:</strong>{" "}
              {paymentState.endTime}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {paymentState.hours}{" "}
              {paymentState.hours === 1
                ? "hour"
                : "hours"}
            </p>

            <p>
              <strong>Hourly Rate:</strong>{" "}
              ₱
              {paymentState.hourlyRate.toLocaleString()}
              /hour
            </p>

          </div>

          {/* =========================
              CONTACT INFORMATION
          ========================== */}

          <div className="contact-information">

            <h2>
              Contact Information
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {paymentState.contact.firstName}{" "}
              {paymentState.contact.lastName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {paymentState.contact.email}
            </p>

            {paymentState.contact.message && (
              <p>
                <strong>Message:</strong>{" "}
                {paymentState.contact.message}
              </p>
            )}

          </div>

          {/* =========================
              PAYMENT SUMMARY
          ========================== */}

          <div className="payment-summary">

            <div className="summary-row">

              <span>
                Hourly Rate
              </span>

              <span>
                ₱
                {paymentState.hourlyRate.toLocaleString()}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Duration
              </span>

              <span>
                {paymentState.hours}{" "}
                {paymentState.hours === 1
                  ? "hour"
                  : "hours"}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Calculation
              </span>

              <span>
                ₱
                {paymentState.hourlyRate.toLocaleString()}
                {" × "}
                {paymentState.hours}
              </span>

            </div>

            <div className="payment-total">

              <span>
                Total
              </span>

              <strong>
                ₱
                {paymentState.total.toLocaleString()}
              </strong>

            </div>

          </div>

          {/* =========================
              PAYMENT METHOD
          ========================== */}

          <div className="payment-method">

            <h2>
              Payment Method
            </h2>

            <label className="payment-option">

              <input
                type="radio"
                name="paymentMethod"
                value="GCash"
                checked={
                  selectedMethod === "GCash"
                }
                onChange={(event) =>
                  setSelectedMethod(
                    event.target.value
                  )
                }
              />

              <span>
                GCash
              </span>

            </label>

          </div>

          {/* =========================
              ERROR
          ========================== */}

          {error && (
            <div className="payment-error">
              {error}
            </div>
          )}

          {/* =========================
              ACTIONS
          ========================== */}

          <div className="payment-actions">

            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Back
            </button>

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Pay ₱${paymentState.total.toLocaleString()}`}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}