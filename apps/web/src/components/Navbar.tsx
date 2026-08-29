export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo">
          <span className="navbar__logo-mark">🐾</span> PawBorrow
        </a>

        <nav className="navbar__links" aria-label="Primary">
          <a href="#top" className="is-active">Home</a>
          <a href="#browse">Browse Pets</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className="navbar__actions">
          <div className="navbar__search">
            <input type="search" placeholder="Search pets, breeds..." aria-label="Search" />
            <button aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button className="navbar__icon-btn" aria-label="Saved pets">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-7.5-4.6-10-9.1C.4 8.3 2 4.5 5.7 4c2.1-.3 4 .8 6.3 3.1C14.3 4.8 16.2 3.7 18.3 4c3.7.5 5.3 4.3 3.7 7.9C19.5 16.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <a href="#browse" className="navbar__cta">Sign In</a>
        </div>
      </div>
    </header>
  );
}
