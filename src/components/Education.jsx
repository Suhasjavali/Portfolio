import { useEffect, useRef } from "react";
import "./Education.css";
import fallbackLogo from "../assets/react.svg";

export default function Education() {
  const educationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (educationRef.current) observer.observe(educationRef.current);

    return () => observer.disconnect();
  }, []);

  const educationData = [
    {
      degree: "Bachelor of Engineering (B.E.) in Information Science",
      institution: "The National Institute of Engineering, Mysuru",
      duration: "2022 - 2026",
      location: "Karnataka, India",
      description:
        "Currently pursuing my degree at The National Institute of Engineering (NIE), where I am enhancing my skills in computer science and full-stack development. The institute provides a hands-on learning environment that encourages innovation, problem-solving, and technical excellence.",
      photo: "/be.avif",
    },
    {
      degree: "Higher Secondary Education (12th)",
      institution: "KLE's Prerana Residential PU Science College, Hubli",
      duration: "2020 - 2022",
      location: "Karnataka, India",
      description:
        "Completed my Pre-University (PU) in Science at KLE's Prerana Residential PU Science College, where I strengthened my foundation in mathematics, physics, and computer science. The college fostered analytical thinking, discipline, and a passion for technology, preparing me for advanced studies in engineering.",
      photo: "/prerana.webp",
    },
    {
      degree: "Higher School (10th)",
      institution: "TMAES DAV Public School,Hospet",
      duration: "2019 - 2020",
      location: "Karnataka, India",
      description:
        "Completed my schooling at TMAES DAV Public School, affiliated with CBSE, where I built a strong foundation in academics, developed critical thinking skills, and nurtured my curiosity in science and technology. The school provided a supportive environment that encouraged learning, creativity, and holistic development.",
      photo: "/dav.webp",
    },
  ];

  return (
    <section id="education" className="education" ref={educationRef}>
      <div className="education__container">
        <h2 className="education__heading">
          Education
          <span className="heading-accent"></span>
        </h2>

        <div className="education__content timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="edu-photo-wrap">
                <img
                  className="edu-photo"
                  src={edu.photo}
                  alt={edu.institution}
                  onError={(e) => {
                    e.currentTarget.src = fallbackLogo;
                  }}
                />
                <span className="timeline-dot" aria-hidden="true" />
              </div>

              <div className="education-card">
                <div className="education-header">
                  <div className="degree-info">
                    <h3 className="degree-title">{edu.degree}</h3>
                    <div className="institution">{edu.institution}</div>
                  </div>
                </div>

                <div className="education-details">
                  <div className="duration-location">
                    <span className="duration">{edu.duration}</span>
                    <span className="location">{edu.location}</span>
                  </div>

                  <p className="education-description">{edu.description}</p>
                </div>

                <div className="education-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}