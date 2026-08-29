// src/components/PetsFooter.tsx
export default function PetsFooter() {
  return (
    <>
      <section className="pets-banner">
        <img src="/images/banner-rabbit.png" alt="Rabbit outdoors" />
        <img src="/images/banner-dog.png" alt="Dog on steps" />
      </section>

      <footer className="pets-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <h4>🐾 PawBorrow</h4>
            <p>
              Sed viverra eget fames sit varius. Pellentesque mattis libero
              viverra dictumst ornaresed justo convallis vitae
            </p>
            <div className="footer-socials">
              <span>FB</span>
              <span>IG</span>
              <span>X</span>
              <span>YT</span>
            </div>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>About Us</li>
              <li>Blog</li>
              <li>Gift Cards</li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Useful Links</h5>
            <ul>
              <li>New products</li>
              <li>Best sellers</li>
              <li>Discount</li>
              <li>F.A.Q</li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Customer Service</h5>
            <ul>
              <li>Contact Us</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Order tracking</li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Store</h5>
            <p>8592 Fairground St.<br />Tallahassee, FL 32303</p>
            <p>+775 378-6348</p>
            <p>PawBorrow@outlook.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© Copyright PawBorrow 2026</span>
          <div className="footer-payments">
            <span>VISA</span>
            <span>AMEX</span>
            <span>MC</span>
            <span>PayPal</span>
          </div>
        </div>
      </footer>
    </>
  );
}