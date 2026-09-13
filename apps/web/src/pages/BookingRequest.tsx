import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "@repo/api";
import type { Pet } from "@repo/api";
import "@/styles/BookingRequest.css";

type LocationState = {
  pet: Pet;
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function calculateEndTime(startTime: string, hours: number) {
  const [hour, minute] = startTime.split(":").map(Number);

  const date = new Date();

  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);
  date.setMilliseconds(0);

  date.setHours(date.getHours() + hours);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatTime(time: string) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
}

export default function BookingRequest() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [startTime, setStartTime] =
    useState("09:00");

  const [hours, setHours] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const state = location.state as LocationState | null;

  /*
   * Check whether a pet was passed from the Pets page.
   */
  if (!state?.pet) {
    return (
      <div className="booking-page">
        <div className="booking-card">
          <h2>No pet selected</h2>

          <p>
            Please select a pet before making a booking.
          </p>

          <button
            type="button"
            onClick={() => navigate("/pets")}
          >
            Back to Pets
          </button>
        </div>
      </div>
    );
  }

  /*
   * At this point TypeScript knows that
   * state.pet definitely exists.
   */
  const pet = state.pet;

  const hourlyRate = pet.hourlyRate;

  const total = hourlyRate * hours;

  const endTime = calculateEndTime(
    startTime,
    hours
  );

  function handleDecreaseHours() {
    if (hours > 1) {
      setHours(hours - 1);
    }
  }

  function handleIncreaseHours() {
    if (hours < 12) {
      setHours(hours + 1);
    }
  }

  async function handleBooking() {
    setError("");

    if (!selectedDate) {
      setError("Please select a reservation date.");
      return;
    }

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }

    if (!lastName.trim()) {
      setError("Please enter your last name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (hours <= 0) {
      setError("Please select at least 1 hour.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Create booking in Supabase.
       */
      const booking = await createBooking({
        pet_id: pet.id,
        reservation_date: formatDate(selectedDate),
        time_slot: startTime,
        duration_hours: hours,
      });

      /*
       * Move to payment page.
       *
       * Everything needed by the payment page
       * is passed through React Router state.
       */
      navigate("/payment", {
        state: {
          bookingId: booking.booking_id,

          pet,

          hours,

          startTime,

          endTime,

          hourlyRate,

          total,

          reservationDate:
            formatDate(selectedDate),

          contact: {
            firstName,
            lastName,
            email,
            message,
          },
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create booking."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="booking-page">
      <div className="booking-container">

        {/* =========================
            PET INFORMATION
        ========================== */}

        <section className="booking-card pet-summary">

          <h1>Book {pet.name}</h1>

          {pet.image && (
            <img
              src={pet.image}
              alt={pet.name}
              className="pet-image"
            />
          )}

          <div className="pet-details">

            <h2>{pet.name}</h2>

            <p>
              <strong>Breed:</strong>{" "}
              {pet.breed || "Unknown"}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {pet.category}
            </p>

            <p>
              <strong>Hourly Rate:</strong>{" "}
              ₱{hourlyRate.toLocaleString()}
              /hour
            </p>

          </div>

        </section>

        {/* =========================
            BOOKING DETAILS
        ========================== */}

        <section className="booking-card">

          <h2>Booking Details</h2>

          {/* DATE */}

          <div className="form-group">

            <label htmlFor="reservationDate">
              Reservation Date
            </label>

            <input
              id="reservationDate"
              type="date"
              min={formatDate(new Date())}
              value={
                selectedDate
                  ? formatDate(selectedDate)
                  : ""
              }
              onChange={(event) => {
                if (event.target.value) {
                  setSelectedDate(
                    new Date(
                      `${event.target.value}T00:00:00`
                    )
                  );
                }
              }}
            />

          </div>

          {/* START TIME */}

          <div className="form-group">

            <label htmlFor="startTime">
              Start Time
            </label>

            <input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(event) =>
                setStartTime(event.target.value)
              }
            />

          </div>

          {/* DURATION */}

          <div className="form-group">

            <label>
              Duration
            </label>

            <div className="hours-selector">

              <button
                type="button"
                onClick={handleDecreaseHours}
                disabled={hours <= 1}
              >
                −
              </button>

              <span>
                {hours}{" "}
                {hours === 1
                  ? "hour"
                  : "hours"}
              </span>

              <button
                type="button"
                onClick={handleIncreaseHours}
                disabled={hours >= 12}
              >
                +
              </button>

            </div>

          </div>

          {/* =========================
              BOOKING SUMMARY
          ========================== */}

          <div className="booking-summary">

            <div>
              <span>
                Hourly Rate
              </span>

              <span>
                ₱{hourlyRate.toLocaleString()}
              </span>
            </div>

            <div>
              <span>
                Duration
              </span>

              <span>
                {hours}{" "}
                {hours === 1
                  ? "hour"
                  : "hours"}
              </span>
            </div>

            <div>
              <span>
                Start Time
              </span>

              <span>
                {formatTime(startTime)}
              </span>
            </div>

            <div>
              <span>
                End Time
              </span>

              <span>
                {endTime}
              </span>
            </div>

            <div className="total-row">

              <strong>
                Total
              </strong>

              <strong>
                ₱{total.toLocaleString()}
              </strong>

            </div>

          </div>

        </section>

        {/* =========================
            CONTACT INFORMATION
        ========================== */}

        <section className="booking-card">

          <h2>
            Contact Information
          </h2>

          <div className="form-row">

            <div className="form-group">

              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(event) =>
                  setFirstName(
                    event.target.value
                  )
                }
                placeholder="Enter first name"
              />

            </div>

            <div className="form-group">

              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(event) =>
                  setLastName(
                    event.target.value
                  )
                }
                placeholder="Enter last name"
              />

            </div>

          </div>

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter email"
            />

          </div>

          <div className="form-group">

            <label htmlFor="message">
              Additional Message
            </label>

            <textarea
              id="message"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Anything we should know?"
              rows={4}
            />

          </div>

        </section>

        {/* =========================
            ERROR
        ========================== */}

        {error && (
          <div className="booking-error">
            {error}
          </div>
        )}

        {/* =========================
            ACTIONS
        ========================== */}

        <div className="booking-actions">

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading
              ? "Creating Booking..."
              : "Continue to Payment"}
          </button>

        </div>

      </div>
    </div>
  );
}