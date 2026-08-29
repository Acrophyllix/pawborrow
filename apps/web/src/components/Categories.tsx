import PhotoTile from './PhotoTile';

const CATEGORIES = [
  { name: 'Cats', count: '10 companions', tone: 'coral' as const, image: '/images/category-cats.jpg' },
  { name: 'Dogs', count: '9 companions', tone: 'peach' as const, image: '/images/category-dogs.jpg' },
  { name: 'Guinea Pigs', count: '10 companions', tone: 'sage' as const, image: '/images/category-guinea-pigs.jpg' },
  { name: 'Rabbits', count: '3 companions', tone: 'sand' as const, image: '/images/category-rabbits.jpg' },
];
export default function Categories() {
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