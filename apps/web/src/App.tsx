import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ---------- PawTile: illustrated placeholder ----------
type PawTileProps = {
  tone?: 'coral' | 'peach' | 'sage' | 'sand' | 'ink';
  label?: string;
  className?: string;
};

const TONES: Record<string, { bg: string; paw: string }> = {
  coral: { bg: '#FBE4E1', paw: '#EE7B6E' },
  peach: { bg: '#FBE9D7', paw: '#F0A857' },
  sage: { bg: '#E7EFE4', paw: '#8AA37B' },
  sand: { bg: '#F1EDE6', paw: '#C7A97A' },
  ink: { bg: '#E9E9E9', paw: '#1B1B1B' },
};

function PawTile({ tone = 'sand', label, className = '' }: PawTileProps) {
  const { bg, paw } = TONES[tone];
  return (
    <div className={`paw-tile ${className}`} style={{ background: bg }} aria-hidden={label ? undefined : true}>
      <svg viewBox="0 0 64 64" className="paw-tile__icon" style={{ fill: paw }}>
        <ellipse cx="32" cy="40" rx="15" ry="12" />
        <ellipse cx="14" cy="24" rx="6" ry="8" />
        <ellipse cx="27" cy="14" rx="6.5" ry="8.5" />
        <ellipse cx="41" cy="14" rx="6.5" ry="8.5" />
        <ellipse cx="52" cy="26" rx="6" ry="8" />
      </svg>
      {label && <span className="paw-tile__label">{label}</span>}
    </div>
  );
}

// ---------- PhotoTile: real photo with graceful fallback ----------
type PhotoTileProps = {
  src: string;
  alt: string;
  tone?: 'coral' | 'peach' | 'sage' | 'sand' | 'ink';
  className?: string;
};

function PhotoTile({ src, alt, tone = 'sand', className = '' }: PhotoTileProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PawTile tone={tone} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`photo-tile ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <p className="eyebrow">PawBorrow &middot; Quezon City</p>
        <h1>
          Pet companionship,<br />borrowed <span>your way.</span>
        </h1>
        <p className="hero__sub">
          Not ready to commit to full-time pet ownership? Borrow a cat, dog, or guinea
          pig for a day, a weekend, or however long you need the company.
        </p>
        <div className="hero__actions">
          <a href="#browse" className="btn btn--dark">Browse Pets</a>
          <a href="#how-it-works" className="btn btn--ghost">How It Works</a>
        </div>
      </div>

      <div className="hero__art">
        <div className="hero__blob" aria-hidden="true" />
        <img
          src="/images/hero-dogs.png"
          alt="Three golden retriever puppies available to borrow"
          className="hero__cutout"
        />
      </div>
    </section>
  );
}

// ---------- Categories ----------
const CATEGORIES = [
  { name: 'Cats', count: '10 companions', tone: 'coral' as const, image: '/images/category-cats.jpg' },
  { name: 'Dogs', count: '9 companions', tone: 'peach' as const, image: '/images/category-dogs.jpg' },
  { name: 'Guinea Pigs', count: '10 companions', tone: 'sage' as const, image: '/images/category-guinea-pigs.jpg' },
  { name: 'Rabbits', count: '3 companions', tone: 'sand' as const, image: '/images/category-rabbits.jpg' },
];

function Categories() {
  return (
    <section id="browse" className="section categories">
      <div className="section__head">
        <h2>Browse by companion</h2>
        <div className="section__arrows" aria-hidden="true">
          <button aria-label="Previous">‹</button>
          <button aria-label="Next">›</button>
        </div>
      </div>

      <div className="categories__grid">
        {CATEGORIES.map((c) => (
          <a href="#browse" className="category-card" key={c.name}>
            <PhotoTile src={c.image} alt={c.name} tone={c.tone} className="category-card__image" />
            <div className="category-card__meta">
              <div>
                <h3>{c.name}</h3>
                <p>{c.count}</p>
              </div>
              <span className="category-card__arrow">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- Featured Pets ----------
const PETS = [
  { name: 'Milo', breed: 'Persian Cat', price: '₱250/day', tone: 'coral' as const, image: '/images/featured-milo.jpg' },
  { name: 'Buddy', breed: 'Pug', price: '₱300/day', tone: 'peach' as const, image: '/images/featured-buddy.jpg' },
  { name: 'Bella', breed: 'Golden Retriever', price: '₱280/day', tone: 'sand' as const, image: '/images/featured-bella.jpg' },
];

function FeaturedPets() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const toggleSaved = (name: string) =>
    setSaved((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <section className="section featured">
      <h2>Featured Companions</h2>

      <div className="featured__grid">
        {PETS.map((pet) => (
          <div className="pet-card" key={pet.name}>
            <PhotoTile src={pet.image} alt={`${pet.name}, ${pet.breed}`} tone={pet.tone} className="pet-card__image" />
            <div className="pet-card__meta">
              <div>
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
                <span className="pet-card__price">{pet.price}</span>
              </div>
              <button
                className={`pet-card__save ${saved[pet.name] ? 'is-saved' : ''}`}
                onClick={() => toggleSaved(pet.name)}
                aria-label={`Save ${pet.name}`}
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Secondary Hero ----------
function SecondaryHero() {
  return (
    <section id="how-it-works" className="section-hero">
      <div className="section-hero__art">
        <div className="section-hero__blob" aria-hidden="true" />
        <img
          src="/images/secondary-hero.png"
          alt="Companion pets at home"
          className="section-hero__cutout"
        />
      </div>
      <div className="section-hero__text">
        <p className="eyebrow eyebrow--dark">How It Works</p>
        <h2>The smarter way to share your home with a pet</h2>
        <p>
          Pick a companion, choose your dates, and we handle the rest — food bowl,
          leash, bed, and care instructions included. Return them when your time's up.
        </p>
        <a href="#browse" className="btn btn--dark">Learn More</a>
      </div>
    </section>
  );
}

// ---------- Included ----------

const ITEMS = [
  { name: 'Food Bowl', note: 'Included with every borrow', tone: 'sand' as const, image: '/images/included-bowl.jpg' },
  { name: 'Cozy Bed', note: 'Included with every borrow', tone: 'peach' as const, image: '/images/included-bed.jpg' },
  { name: 'Leash & Collar', note: 'For dogs and walks', tone: 'coral' as const, image: '/images/included-leash.jpg' },
  { name: 'Starter Food Pack', note: '₱199 add-on', tone: 'sage' as const, image: '/images/included-food.jpg' },
];

function Included() {
  return (
    <section className="section included">
      <h2>What comes with every borrow</h2>

      <div className="included__grid">
        {ITEMS.map((item) => (
          <div className="item-card" key={item.name}>
            <PhotoTile src={item.image} alt={item.name} tone={item.tone} className="item-card__image" />
            <div className="item-card__meta">
              <div>
                <h3>{item.name}</h3>
                <p>{item.note}</p>
              </div>
              <button aria-label={`Save ${item.name}`}>♥</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Stories ----------
const POSTS = [
  { date: '24 May, 2024', title: 'First-Time Borrower? Here\u2019s What to Expect', tone: 'coral' },
  { date: '24 May, 2024', title: 'How We Screen Every Companion Before Borrowing', tone: 'peach' },
  { date: '24 May, 2024', title: 'Weekend With a Dog: A QC Student\u2019s Story', tone: 'sand' },
];

function Stories() {
  return (
    <section className="section stories">
      <h2>Stories & Tips</h2>

      <div className="stories__grid">
        {POSTS.map((post) => (
          <a href="#" className="story-card" key={post.title}>
            <div className={`story-card__cover story-card__cover--${post.tone}`}>
              <span className="story-card__badge">News</span>
            </div>
            <p className="story-card__date">{post.date}</p>
            <h3>{post.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------- App ----------
function App() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedPets />
      <SecondaryHero />
      <Included />
      <Stories />
      <Footer />
    </div>
  );
}

export default App;