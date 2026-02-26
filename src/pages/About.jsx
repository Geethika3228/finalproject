import InfoCard from "../components/InfoCard";
import "../styles/about.css";

function About() {
  return (
    <div className="about-page">

      {/* Page Header */}
      <section className="about-hero">
        <h1>About Findora – Multi-Category Search Platform</h1>
        <p>
          A robust, scalable platform to search, filter, and explore products across multiple categories.
        </p>
      </section>

      {/* Content */}
      <section className="about-content">

        {/* Our Mission */}
        <InfoCard icon="🚀" title="Our Mission">
          <p>
            Findora is designed to empower users with a seamless browsing experience.
            Our goal is to provide precise, intuitive search and filter capabilities
            across diverse product categories.
          </p>
          <p>
            We focus on performance, accessibility, and a user-centric interface
            to make discovering products faster and more enjoyable.
          </p>
        </InfoCard>

        {/* Technology */}
        <InfoCard icon="💻" title="Technology & Architecture">
          <p>
            Findora is built with modern web technologies, including React for
            front-end rendering, context-based state management, and RESTful APIs.
          </p>
          <p>
            The platform uses optimized search algorithms, dynamic filtering,
            and derived state management for a responsive and fluid user experience.
          </p>
        </InfoCard>

        {/* Get Involved */}
        <InfoCard icon="📬" title="Get Involved">
          <p>
            Interested in contributing or learning more? Fineora welcomes developers,
            testers, and enthusiasts to explore and enhance the platform.
          </p>
          <p><strong>Email:</strong> support@findora.com</p>
          <p>
            <strong>GitHub:</strong> <a href="https://github.com/your-repo" target="_blank">https://github.com/your-repo</a>
          </p>
        </InfoCard>

      </section>

    </div>
  );
}

export default About;