import React from 'react';
import './About.css'; // Make sure this CSS file is created
import tnjfuImage from './assets/tnjfu.png';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>ABOUT US</h1>
      </header>

      <section className="about-section">
        <h2>Welcome to Ocean Bite!</h2>
        <div className="image-and-text">
          <img
            src={tnjfuImage}
            alt="Production Facility"
            className="factory-image"
          />
          <p>
            We are a student-driven seafood brand from Dr. M.G.R. Fisheries College and Research Institute, Ponneri, bringing you hygienically prepared, delicious fish-based snacks straight from our expertise in fish processing. Every bite reflects our passion for quality, freshness, and innovation. Come experience the true taste of the ocean with us!
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>OUR STORY</h2>
        <p>
          At Ocean Bites, we are passionate about providing the freshest and most delicious seafood to our customers. With a commitment to quality and sustainable source our products responsibly to ensure a delightful experience.
        </p>   
      </section>

      <section className="about-section">
        <h2>Where It Is Produced ?</h2>
        
          <p>
            Every product at Ocean Bites is produced in the <strong>FSSAI Certified</strong> processing centre of our college, which is both hygienic and delicious.
          </p>
      </section>

      <section className="about-section">
        <h2>Why choose us ?</h2>
        <p>
          "Because we combine scientific training with a passion for quality, ensuring every product is safe, flavorful, and crafted with care."
          <br /><br />
          "We don't just make seafood products — we understand them, inspect them as per FSSAI food safety guidelines and cold chain logistics, and perfect them."
        </p>
      </section>
    </div>
  );
};

export default About;