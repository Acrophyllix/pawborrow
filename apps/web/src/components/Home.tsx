import Navbar from './Navbar';
import Hero from './Hero';
import Categories from './Categories';
import FeaturedPets from './FeaturedPets';
import SecondaryHero from './SecondaryHero';
import Included from './Included';
import Stories from './Stories';
import Footer from './Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedPets />
      <SecondaryHero />
      <Included />
      <Stories />
      <Footer />
    </>
  );
}