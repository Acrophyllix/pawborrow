import PhotoTile from './PhotoTile';

export default function SecondaryHero() {
  return (
    <section id="how-it-works" className="section-hero">
      <div className="section-hero__art">
        <div className="section-hero__photo">
          <PhotoTile src="/images/secondary-hero.png" alt="Companion pets at home" tone="sand" />
        </div>
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