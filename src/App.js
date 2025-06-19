import React, { useState } from 'react';
import './App.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      {loading && <Loader onLoaded={() => setLoading(false)} />}
      <Navbar />
      <section id="home" className="section">Home Section (Hero/Parallax)</section>
      <section id="features" className="section">Features Section</section>
      <section id="showcase" className="section">Showcase Section</section>
      <section id="testimonials" className="section">Testimonials Section</section>
      <section id="stats" className="section">Stats Section</section>
      <section id="carousel" className="section">Carousel Section</section>
    </div>
  );
}

export default App;
