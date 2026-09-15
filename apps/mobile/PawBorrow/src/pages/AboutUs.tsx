import { useNavigate } from 'react-router-dom';
import { IonContent, IonPage, IonIcon } from '@ionic/react';
import {
  chevronBackOutline,
  locationSharp,
  pawSharp,
  callOutline,
  logoFacebook,
  logoInstagram,
  logoTwitter,
} from 'ionicons/icons';
import LocationMap from '../components/LocationMap';
import logo from '../assets/pawborrow-logo.png';
import cat from '../assets/cat-peeking.png';
import '../style/AboutUs.css';

const PHONE = '+6309562392943294';

const socials = [
  { icon: logoFacebook, label: 'Facebook', href: 'https://facebook.com/' },
  { icon: logoInstagram, label: 'Instagram', href: 'https://instagram.com/' },
  { icon: logoTwitter, label: 'Twitter', href: 'https://twitter.com/' },
];

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonContent fullscreen className="about-us-content">
        <div className="about-us-scroll">
          <button
            className="about-us-back"
            aria-label="Go back"
            onClick={() => navigate(-1)}
          >
            <IonIcon icon={chevronBackOutline} />
          </button>

          <section className="about-panel about-panel--intro">
            <img className="about-wordmark" src={logo} alt="PawBorrow" />
            <p className="about-tagline">For Pet &amp; Pet Supplies</p>
            <hr className="about-divider" />
            <p className="about-copy">
              PawBorrow is a pet companion service that connects people with
              loving cats, dogs, and guinea pigs for temporary, supervised
              companion experiences. We make it easier for Quezon City residents
              to enjoy the comfort, joy, and companionship of pets without the
              long-term commitment and responsibilities of pet ownership.
            </p>
          </section>

          <section className="about-panel about-panel--contact">
            <h2 className="about-heading">
              <IonIcon icon={locationSharp} className="about-heading-pin" />
              Our Location
            </h2>

            <LocationMap />

            <h2 className="about-heading about-heading--contact">
              <IonIcon icon={pawSharp} className="about-heading-paw" />
              Contact Us
            </h2>

            <div className="about-contact">
              <img className="about-cat" src={cat} alt="" aria-hidden="true" />

              <a className="about-phone" href={`tel:${PHONE}`}>
                <span className="about-phone-icon">
                  <IonIcon icon={callOutline} />
                </span>
                <span className="about-phone-number">{PHONE}</span>
              </a>
            </div>

            <div className="about-socials">
              {socials.map((s) => (<a
                
                  key={s.label}
                  className="about-social"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                >
                  <IonIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AboutUs;