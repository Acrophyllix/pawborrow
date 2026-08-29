import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedPets from './components/FeaturedPets';
import SecondaryHero from './components/SecondaryHero';
import Included from './components/Included';
import Stories from './components/Stories';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedPets />
      <SecondaryHero />
      <Included />
      <Stories />
      <Footer />
    </div>
  );
}

export default App;
