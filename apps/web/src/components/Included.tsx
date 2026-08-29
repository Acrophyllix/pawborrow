import PawTile from './PawTile';

const ICONS = ['🍽️', '🏠', '❤️', '🐾', '🦴'];

const ITEMS = [
  { name: 'Food Bowl', note: 'Included with every borrow', tone: 'sand' as const },
  { name: 'Cozy Bed', note: 'Included with every borrow', tone: 'peach' as const },
  { name: 'Leash & Collar', note: 'For dogs and walks', tone: 'coral' as const },
  { name: 'Starter Food Pack', note: '₱199 add-on', tone: 'sage' as const },
];

export default function Included() {
  return (
    <section className="section included">
      <h2>What comes with every borrow</h2>

      <div className="included__icons" aria-hidden="true">
        {ICONS.map((icon, i) => (
          <span key={i}>{icon}</span>
        ))}
      </div>

      <div className="included__grid">
        {ITEMS.map((item) => (
          <div className="item-card" key={item.name}>
            <PawTile tone={item.tone} className="item-card__image" />
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
