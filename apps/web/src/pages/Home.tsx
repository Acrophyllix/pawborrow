import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedPets from '@/components/FeaturedPets';
import SecondaryHero from '@/components/SecondaryHero';
import Included from '@/components/Included';
import Stories from '@/components/Stories';
import Footer from '@/components/ui/Footer';

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