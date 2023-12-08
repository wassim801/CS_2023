// EducateAdvocatePage.js
import React from 'react';

const EducateAdvocatePage = () => {
  return (
    <div className="educate-advocate-page">
      <h1>Climate Change Education and Advocacy</h1>

      <section>
        <h2>Why Climate Change Matters</h2>
        <p>
          Climate change has wide-ranging impacts on our environment, economy, and communities.
          Understanding its causes and effects is crucial for making informed decisions.
        </p>
      </section>

      <section>
        <h2>Sustainable Practices</h2>
        <p>
          Learn about sustainable practices that businesses and consumers can adopt to reduce their
          environmental footprint. This includes using eco-friendly products, reducing waste,
          and promoting energy efficiency.
        </p>
      </section>

      <section>
        <h2>Resources</h2>
        <ul>
          <li>
            <a href="https://www.climate.gov/" target="_blank" rel="noopener noreferrer">
              National Centers for Environmental Information - Climate.gov
            </a>
          </li>
          <li>
            <a href="https://www.epa.gov/climate-indicators" target="_blank" rel="noopener noreferrer">
              EPA Climate Indicators
            </a>
          </li>
          {/* Add more relevant resources */}
        </ul>
      </section>

      <section>
        <h2>Take Action</h2>
        <p>
          Advocate for positive change by supporting businesses with sustainable practices,
          participating in community initiatives, and staying informed about climate policies.
        </p>
      </section>
    </div>
  );
};

export default EducateAdvocatePage;
