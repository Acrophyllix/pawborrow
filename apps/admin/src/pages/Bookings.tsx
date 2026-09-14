import { useState } from "react";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useAdminBookings, useUpdateBooking} from "@repo/api";


function MiniBars({ heights, highlightColor,}: {
  heights: number[];
  highlightColor: string;
}) {
  return (
    <div className="flex h-9 items-end gap-1">
      {heights.map((h, i) => (
        <div key={i} className="w-1.5 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === heights.length - 2 ? highlightColor: "#E5E7EB",}}/>
      ))}
    </div>
  );
}

function CircularProgress({ percent, color }: { percent: number; color: string;}) {
  const size = 44;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (percent / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="-rotate-90"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#F1F1F1"
        strokeWidth={stroke}
        fill="none"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-200 text-yellow-800",
  approved: "bg-emerald-200 text-emerald-700",
  confirmed: "bg-emerald-200 text-emerald-700",
  cancelled: "bg-rose-200 text-rose-700",
  reschedule: "bg-sky-200 text-sky-700",
  completed: "bg-gray-200 text-gray-700",
};

function formatTime(time: string | null) {
  if (!time) return "—";

  const [hours, minutes] = time.split(":").map(Number);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes)
  ) {
    return time;
  }

  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(
    2,
    "0"
  )} ${suffix}`;
}

function calculateEndTime(startTime: string | null, durationMinutes: number)
 {
  if (!startTime) return "—";

  const [hours, minutes] = startTime
    .split(":")
    .map(Number);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes)
  ) {
    return "—";
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);
  date.setMinutes(date.getMinutes() + durationMinutes);

  return formatTime(
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`
  );
}

function getBookerName( firstName: string | null | undefined, lastName: string | null | undefined, email: string | null | undefined) 
{
  const name = [firstName, lastName]
    .filter(Boolean)
    .join(" ");

  return name || email || "Unknown customer";
}

export default function Bookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useAdminBookings();

  const UpdateBookingStatus = useUpdateBooking();
  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const selected =
    bookings?.find(
      (booking) => booking.booking_id === selectedId
    ) ?? null;

  const totalBookings = bookings?.length ?? 0;

  const pendingBookings =
    bookings?.filter(
      (booking) => booking.status.toLowerCase() === "pending"
    ).length ?? 0;

  function hnadleStatus(status: "confirmed" | "cancelled") 
  {
    if(!selected) return;

    UpdateBookingStatus.mutate({bookingId: selected.booking_id, status}, {onSuccess: () =>{setSelectedId(null);},});
  }

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Bookings" />

      <div className="p-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-base font-bold text-gray-800">
            Bookings
          </h2>

          <div className="mb-8 grid grid-cols-2 gap-8 sm:grid-cols-4">

            <div className="flex items-center gap-3">
              <MiniBars
                heights={[35, 55, 40, 90, 60]}
                highlightColor="#EC4899"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Total Bookings
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {totalBookings}
                  <span className="text-xs font-normal text-gray-400">
                    {" "}
                    Total
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MiniBars
                heights={[30, 45, 35, 70, 50]}
                highlightColor="#34D399"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Online Bookings
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {totalBookings}
                  <span className="text-xs font-normal text-gray-400">
                    {" "}
                    Total
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CircularProgress
                percent={
                  totalBookings > 0
                    ? (pendingBookings / totalBookings) * 100
                    : 0
                }
                color="#34D399"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Pending Approval
                </p>

                <p className="text-lg font-bold text-gray-800">
                  {pendingBookings}
                </p>
              </div>
            </div>


          </div>

          <h3 className="mb-4 text-sm font-bold text-gray-800">
            Upcoming Appointments
          </h3>

          {isLoading && (
            <p className="py-8 text-center text-sm text-gray-400">
              Loading bookings...
            </p>
          )}

          {error && (
            <p className="py-8 text-center text-sm text-red-500">
              Failed to load bookings:{" "}
              {error instanceof Error
                ? error.message
                : String(error)}
            </p>
          )}

          {!isLoading &&
            !error &&
            bookings &&
            bookings.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-400">
                No bookings found.
              </p>
            )}

          {!isLoading &&
            !error &&
            bookings &&
            bookings.length > 0 && (
              <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => {
                  const pet = booking.pet;
                  const profile =
                    booking.user_profile;

                  const booker = getBookerName(
                    profile?.first_name,
                    profile?.last_name,
                    profile?.email
                  );

                  const status =
                    booking.status.toLowerCase();

                  return (
                    <div
                      key={booking.booking_id}
                      className="rounded-xl border border-gray-100 p-4 shadow-sm"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {pet?.image_url ? (
                            <img
                              src={pet.image_url}
                              alt={pet.name}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-gray-200" />
                          )}

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {pet?.name ??
                                "Unknown pet"}
                            </p>

                            <p className="text-xs text-sky-500">
                              Booker: {booker}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                            statusStyles[status] ??
                            "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div className="mb-3 flex justify-between text-xs">
                        <div>
                          <p className="text-sky-500">
                            Session Start
                          </p>

                          <p className="text-gray-500">
                            {formatTime(
                              booking.time_slot
                            )}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sky-500">
                            Session End
                          </p>

                          <p className="text-gray-500">
                            {calculateEndTime(
                              booking.time_slot,
                              booking.duration_minutes
                            )}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedId(
                            booking.booking_id
                          )
                        }
                        className="w-full rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        VIEW DETAILS
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-bold text-gray-800">
              In progress
            </h3>

            <p className="text-xs text-gray-400">
              No sessions currently in progress.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-gray-800">
              Today
            </h3>

            <p className="text-xs text-gray-400">
              No further sessions scheduled for today.
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={selected !== null}
        onClose={() => setSelectedId(null)}
        title={
          selected
            ? `${selected.pet?.name ?? "Pet"}'s Appointment`
            : undefined
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {selected.pet?.image_url ? (
                <img
                  src={selected.pet.image_url}
                  alt={selected.pet.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-200" />
              )}

              <div>
                <p className="font-semibold text-gray-800">
                  {selected.pet?.name ??
                    "Unknown pet"}
                </p>

                <p className="text-sm text-sky-500">
                  Booker:{" "}
                  {getBookerName(
                    selected.user_profile?.first_name,
                    selected.user_profile?.last_name,
                    selected.user_profile?.email
                  )}
                </p>
              </div>

              <span
                className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[
                    selected.status.toLowerCase()
                  ] ??
                  "bg-gray-200 text-gray-700"
                }`}
              >
                {selected.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 text-sm">
              <div>
                <p className="text-xs text-sky-500">
                  Session Start
                </p>

                <p className="font-medium text-gray-700">
                  {formatTime(selected.time_slot)}
                </p>
              </div>

              <div>
                <p className="text-xs text-sky-500">
                  Session End
                </p>

                <p className="font-medium text-gray-700">
                  {calculateEndTime(
                    selected.time_slot,
                    selected.duration_minutes
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-gray-400">
                Booking Date
              </p>

              <p className="text-sm text-gray-500">
                {selected.reservation_date}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-gray-400">
                Duration
              </p>

              <p className="text-sm text-gray-500">
                {selected.duration_minutes} minutes
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-gray-400">
                Pet
              </p>

              <p className="text-sm text-gray-500">
                {selected.pet?.name ?? "Unknown pet"}
              </p>

              <p className="text-xs text-gray-400">
                {selected.pet?.breed ?? "Unknown breed"}
              </p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-gray-400">
                Customer Email
              </p>

              <p className="text-sm text-gray-500">
                {selected.user_profile?.email ??
                  "No email"}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {handleStatus("confirmed");}} disabled={UpdateBookingStatus.isPending} 
                className="flex-1 rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Approve
              </button>

              <button
                onClick={() => {
                  // TODO: connect to reschedule logic
                  console.log(
                    "Reschedule booking:",
                    selected.booking_id
                  );
                }}
                className="flex-1 rounded-lg bg-sky-500 py-2 text-sm font-semibold text-white hover:bg-sky-600"
              >
                Reschedule
              </button>

              <button
                onClick={() => {
                  // TODO: connect to updateBookingStatus()
                  console.log(
                    "Cancel booking:",
                    selected.booking_id
                  );
                }}
                className="flex-1 rounded-lg bg-rose-500 py-2 text-sm font-semibold text-white hover:bg-rose-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}