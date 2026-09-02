// src/components/PetsHero.tsx
import { Heart, Search, User } from "lucide-react";

export default function PetsHero() {
  return (
    <header className="pets-hero">
      <nav className="pets-nav">
        <div className="pets-logo">
          🐾 Paw<span>Borrow</span>
        </div>
        <ul className="pets-nav-links">
          <li>Home</li>
          <li className="active">Pets</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        <div className="pets-nav-actions">
          <input type="text" placeholder="Search products..." />
          <Search size={18} />
          <Heart size={18} />
          <User size={18} />
        </div>
      </nav>

      <div className="pets-hero-content">
        <div className="pets-hero-text">
          <span className="eyebrow">PawBorrow</span>
          <h1>
            Friends come with
            <br />
            four paws
          </h1>
          <p>
            At et vehicula sodales est proin turpis pellentesque simulla a
            aliquam amet rhoncus quisque eget sit.
          </p>
        </div>
        <div className="pets-hero-image">
          <div className="hero-blob" />
          {/* Replace with your real cat/dog photo */}
          <img src="/images/hero-pets.png" alt="Cat and dog" />
        </div>
      </div>
    </header>
  );
}