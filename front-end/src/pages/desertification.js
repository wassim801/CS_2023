// DesertificationPage.js
import React from 'react';

const DesertificationPage = () => {
  return (
    <div className="desertification-page">
      <header>
        <h1>Understanding Desertification</h1>
        <p>Addressing the Impact and Promoting Sustainable Solutions</p>
      </header>

      <section>
        <img
          src="images/desertification.jpg"
          className="banner-image"
          alt="Desertification Illustration"
        />
        <p>
          Desertification is a critical environmental issue affecting ecosystems, communities, and
          biodiversity. Learn about its causes, consequences, and sustainable solutions to combat
          this global challenge.
        </p>
      </section>

      <section>
        <h2>Causes of Desertification</h2>
        <ul>
          <li>Climate Change</li>
          <li>Deforestation</li>
          <li>Overgrazing</li>
          <li>Poor Agricultural Practices</li>
        </ul>
      </section>

      <section>
        <h2>Impact on Ecosystems and Communities</h2>
        <p>
          Desertification leads to the degradation of land, loss of biodiversity, and challenges for
          communities dependent on agriculture and livestock.
        </p>
      </section>

      <section>
        <h2>Sustainable Solutions</h2>
        <p>
          Explore sustainable land management practices, reforestation initiatives, and community
          engagement strategies to combat desertification and promote environmental resilience.
        </p>
      </section>

      <footer>
        <p>
          For more information and resources on desertification, visit{' '}
          <a
            href="https://www.unccd.int/"
            target="_blank"
            rel="noopener noreferrer"
          >
            UNCCD - United Nations Convention to Combat Desertification
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default DesertificationPage;
