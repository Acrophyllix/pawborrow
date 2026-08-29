export default function Hero() {
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