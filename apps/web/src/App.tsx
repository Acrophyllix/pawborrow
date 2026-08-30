import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.tsx';
import AboutPage from './components/AboutPage.tsx';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;