// src/components/About.jsx
import { useEffect, useRef } from "react";
import "./About.css";

export default function About() {
  const aboutRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef} aria-labelledby="about-title">
      <div className="about__container">
        <h2 id="about-title" className="about__heading">
          Who I am?
          <span className="heading-accent"></span>
        </h2>
        
        <div className="about__cards">
          <div className="about-card" ref={card1Ref}>
            <div className="card-icon">
              {/* <img src="/contact/github.png" alt="Developer" className="icon-image" /> */}
            </div>
            <h3 className="card-title">Full-Stack Developer</h3>
            <p className="card-content">
              I'm a passionate Full-Stack Developer with expertise in modern web technologies. 
              I love building responsive, user-friendly interfaces and robust backend architectures 
              that solve real-world problems.
            </p>
            <div className="card-glow"></div>
          </div>

          <div className="about-card" ref={card2Ref}>
            <div className="card-icon">
              {/* <img src="/contact/linkedin.webp" alt="Problem Solver" className="icon-image" /> */}
            </div>
            <h3 className="card-title">Problem Solver</h3>
            <p className="card-content">
              My strength lies in rapid development and adaptability. I quickly adjust to new 
              environments and technologies, turning every project into an opportunity to innovate, 
              learn, and create meaningful impact through software.
            </p>
            <div className="card-glow"></div>
          </div>
        </div>

        {/* Resume button section */}
        <div className="about__resume-section">
          <a 
            href="https://drive.google.com/file/d/1Q-Rb0EIVOIqckeSNIAIEgyIEqZW7sXzc/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="resume-button"
          >
            <span className="resume-button-text">View Resume</span>
          </a>
        </div>

        {/* Additional info section with contact icons */}
        <div className="about__contact-info">
          {/* <h3 className="contact-info-title">Let's Connect</h3> */}
          <div className="contact-icons">
  <a href="https://leetcode.com/u/suhas_javali/" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
    <img src="/contact/leet.png" alt="LeetCode profile of Suhas Javali" className="contact-icon" />
  </a>

  <a href="https://github.com/suhasjavali" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
    <img src="/contact/github.png" alt="GitHub profile of Suhas Javali" className="contact-icon" />
  </a>

  <a href="https://linkedin.com/in/suhas-javali" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
    <img src="/contact/linkedin.webp" alt="LinkedIn profile of Suhas Javali" className="contact-icon" />
  </a>

  <a href="https://www.youtube.com/@suhas_javali/videos" target="_blank" rel="noopener noreferrer" className="contact-icon-link">
    <img src="/contact/yt.png" alt="YouTube channel of Suhas Javali" className="contact-icon" />
  </a>
</div>

        </div>
      </div>
    </section>
  );
}
