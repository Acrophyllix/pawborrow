import { useState } from 'react';
import '@/styles/Booking.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

type Pet = {
  name: string;
  breed: string;
  age: string;
  image: string;
};

const PETS: Pet[] = [
  {
    name: 'Yuki',
    breed: 'Scottish Fold',
    age: '5 Months',
    image: '/images/featured-milo.jpg',
  },
  {
    name: 'Yuki',
    breed: 'Scottish Fold',
    age: '5 Months',
    image: '/images/featured-milo.jpg',
  },
  {
    name: 'Yuki',
    breed: 'Scottish Fold',
    age: '5 Months',
    image: '/images/featured-milo.jpg',
  },
];



function BookingHero() {
  return (
    <section className="booking-hero">
      <div className="booking-hero__decor booking-hero__decor--one" />
      <div className="booking-hero__decor booking-hero__decor--two" />
      <div className="booking-hero__decor booking-hero__decor--three" />

      <div className="booking-hero__content">
        <p className="booking-hero__eyebrow">Pet Shop</p>

        <h1>
          If animals could talk,
          <br />
          they’d talk about us!
        </h1>

        <p>
          At Pet Valucolo, we provide high quality pets and
          <br />
          services for animal lovers.
        </p>

        <a href="#pet-booking" className="booking-button">
          Book Now
        </a>
      </div>

      <div className="booking-hero__image">
        <div className="booking-hero__circle" />

        <img
          src="/images/category-guinea-pigs.jpg"
          alt="Guinea pig"
        />
      </div>
    </section>
  );
}

function ContactForm({
  title,
  onSubmit,
}: {
  title?: string;
  onSubmit?: (e: React.FormEvent) => void;
}) {
  return (
    <form className="booking-contact-form" onSubmit={onSubmit}>
      {title && <h3>{title}</h3>}

      <div className="booking-form-row">
        <label>
          <span>First Name</span>
          <input type="text" placeholder="First name" required />
        </label>

        <label>
          <span>Last Name</span>
          <input type="text" placeholder="Last name" required />
        </label>
      </div>

      <label>
        <span>Email Address</span>
        <input type="email" placeholder="E-mail address" required />
      </label>

      <label>
        <span>Message</span>
        <textarea
          placeholder="Your message..."
          rows={5}
        />
      </label>

      <button type="submit" className="booking-confirm-button">
        Confirm
      </button>
    </form>
  );
}

function PetSelection({
  selectedPet,
  onSelect,
}: {
  selectedPet: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="pet-selection">
      <h2>Select the Pet you want to book</h2>

      <p className="booking-description">
        Upon selecting the pet you want to book you will be providing details needed
        and confirmation.
      </p>

      <div className="pet-list">
        {PETS.map((pet, index) => (
          <button
            type="button"
            key={index}
            className={`pet-option ${
              selectedPet === index ? 'pet-option--selected' : ''
            }`}
            onClick={() => onSelect(index)}
          >
            <div className="pet-option__image">
              <img src={pet.image} alt={pet.name} />
            </div>

            <p>
              Cat | Name: {pet.name} | Breed: {pet.breed} | Age: {pet.age}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function PaymentInformation() {
  return (
    <div className="payment-information">
      <h2>Select a payment method</h2>

      <p className="booking-description">
        Upon selecting the pet you want to book you will be providing details needed
        and confirmation.
      </p>

      <div className="payment-details">
        <div className="payment-detail">
          <span className="payment-icon">⌖</span>
          <span>8592 Fairground St.Tallahassee, FL 32303</span>
        </div>

        <div className="payment-detail">
          <span className="payment-icon">✉</span>
          <span>pawborrow@outlook.com</span>
        </div>

        <div className="payment-detail">
          <span className="payment-icon">⌕</span>
          <span>+776 378-6348</span>
        </div>

        <div className="payment-detail">
          <span className="payment-icon">◷</span>
          <span>Mon - Fri 10AM - 10PM</span>
        </div>
      </div>
    </div>
  );
}



export default function Booking() {
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedPet === null) {
      alert('Please select a pet first.');
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="booking-page">
      <Navbar />

      <BookingHero />

      <main>
        {/* PET SELECTION */}
        <section id="pet-booking" className="booking-section">
          <div className="booking-grid">
            <PetSelection
              selectedPet={selectedPet}
              onSelect={setSelectedPet}
            />

            <ContactForm onSubmit={handleSubmit} />
          </div>
        </section>

        {/* PAYMENT / CONTACT */}
        <section className="booking-section booking-section--payment">
          <div className="booking-grid">
            <PaymentInformation />

            <ContactForm />
          </div>
        </section>

        {submitted && (
          <div className="booking-success">
            <div className="booking-success__icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>
              Thank you for choosing PawBorrow. We will contact you shortly.
            </p>
          </div>
        )}
      </main>

   <Footer/>
    </div>
  );
}