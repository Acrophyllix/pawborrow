import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { chevronBackOutline, calendarOutline, timeOutline, cardOutline, chevronForwardOutline } from 'ionicons/icons';
import { createBooking, type CreateBookingInput } from '@repo/api';
import { mockCards } from '../data/paymentMethods';
import '../style/BookingReview.css';

type BookingDraft = {
  petId: number;
  photo: string;
  name: string;
  category: string;
  subtitle: string;
  reservationDate: string; 
  timeSlot: string;        
  durationMinutes: number;
  displayDate: string;     
  displayTime: string;
  detail?: string;
};

const BookingReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const draftState = location.state as (BookingDraft & { selectedCardId?: string; returnTo?: string }) | undefined;
  const draft = draftState as BookingDraft | undefined;
  const returnTo = draftState?.returnTo ?? '/dashboard';

  const [selectedCardId, setSelectedCardId] = useState(draftState?.selectedCardId ?? mockCards[0]?.id ?? '');
  const selectedCard = mockCards.find((c) => c.id === selectedCardId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate(returnTo, { replace: true });
  };

  const handlePaymentSelect = () => {
    navigate('/payment-methods', {
      state: { draft, selectedCardId, returnTo },
    });
  };

  if (!draft) {
    return (
      <IonPage>
        <IonContent fullscreen className="booking-review-content">
          <div className="booking-review-empty">
            <p>Nothing to review.</p>
            <button onClick={() => navigate('/dashboard')}>Back to Home</button>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const handleConfirm = async () => {
    setError(null);
    setIsSubmitting(true);

    const input: CreateBookingInput = {
      pet_id: draft.petId,
      reservation_date: draft.reservationDate,
      time_slot: draft.timeSlot,
      duration_minutes: draft.durationMinutes,
    };

    try {
      const booking = await createBooking(input);
      navigate('/booking-confirmation', {
        state: {
          ...booking,
          photo: draft.photo,
          name: draft.name,
          subtitle: draft.subtitle,
        },
        replace: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="booking-review-content">
        <div className="booking-review">
          <header className="booking-review-header">
            <button className="booking-review-back" aria-label="Go back" onClick={handleBack}>
              <IonIcon icon={chevronBackOutline} />
            </button>
            <h1>Confirm Booking</h1>
          </header>

          <div className="booking-review-card">
            <img src={draft.photo} alt={draft.name} />
            <div>
              <p className="booking-review-name">{draft.name}</p>
              <p className="booking-review-subtitle">
                {draft.category} • {draft.subtitle}
              </p>
            </div>
          </div>

          <div className="booking-review-details">
            <div className="booking-review-row">
              <span className="booking-review-row-label">
                <IonIcon icon={calendarOutline} /> Date
              </span>
              <span className="booking-review-row-value">{draft.displayDate}</span>
            </div>
            <div className="booking-review-row">
              <span className="booking-review-row-label">
                <IonIcon icon={timeOutline} /> Time
              </span>
              <span className="booking-review-row-value">{draft.displayTime}</span>
            </div>
            {draft.detail && (
              <div className="booking-review-row">
                <span className="booking-review-row-label">Details</span>
                <span className="booking-review-row-value">{draft.detail}</span>
              </div>
            )}
          </div>

          <p className="booking-review-section-title">Payment Method</p>
          {mockCards.length === 0 ? (
            <button className="booking-review-payment booking-review-payment--empty" onClick={() => navigate('/payment-methods')}>
              <span className="booking-review-payment-icon"><IonIcon icon={cardOutline} /></span>
              <span className="booking-review-payment-label">Add a payment method</span>
              <IonIcon icon={chevronForwardOutline} className="booking-review-payment-arrow" />
            </button>
          ) : (
            <button className="booking-review-payment" onClick={handlePaymentSelect}>
              <span className="booking-review-payment-icon"><IonIcon icon={cardOutline} /></span>
              <div className="booking-review-payment-info">
                <p className="booking-review-payment-brand">{selectedCard?.brand}</p>
                <p className="booking-review-payment-number">•••• {selectedCard?.last4}</p>
              </div>
              <IonIcon icon={chevronForwardOutline} className="booking-review-payment-arrow" />
            </button>
          )}

          {error && <p className="booking-review-error">{error}</p>}

          <p className="booking-review-note">
            Please review your booking details carefully. You can go back to change the date or time before confirming.
          </p>
        </div>

        <div className="booking-review-footer">
          <button className="booking-review-cancel" onClick={handleBack} disabled={isSubmitting}>
            Back
          </button>
          <button className="booking-review-confirm" onClick={handleConfirm} disabled={!selectedCard || isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BookingReview;