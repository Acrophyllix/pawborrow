import { useState } from 'react';
import PhotoTile from './PhotoTile';

const PETS = [
  { name: 'Milo', breed: 'Persian Cat', price: '₱250/day', tone: 'coral' as const, image: '/images/featured-milo.jpg' },
  { name: 'Buddy', breed: 'Pug', price: '₱300/day', tone: 'peach' as const, image: '/images/featured-buddy.jpg' },
  { name: 'Bella', breed: 'Golden Retriever', price: '₱280/day', tone: 'sand' as const, image: '/images/featured-bella.jpg' },
];

export default function FeaturedPets() {
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