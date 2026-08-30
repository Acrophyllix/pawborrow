import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">🐾</span> PawBorrow
          </Link>
          <p>
            Temporary pet companionship for Quezon City households — borrow the joy,
            skip the long-term commitment.
          </p>
          <div className="footer__social" aria-label="Social links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="X">x</a>
            <a href="#" aria-label="TikTok">tt</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><a href="#">Become a Host</a></li>
            <li><a href="#">F.A.Q.</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/#contact">Contact Us</a></li>
            <li><a href="#">Safety & Trust</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Reach Us</h4>
          <address>
            Quezon City, Metro Manila<br />
            hello@pawborrow.ph<br />
            +63 900 000 0000
          </address>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 PawBorrow. All rights reserved.</p>
      </div>
    </footer>
  );
}