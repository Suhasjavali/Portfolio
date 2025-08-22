import { useEffect, useRef } from "react";
import "./Skills.css";

export default function Skills() {
  const skillsRef = useRef(null);

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

    if (skillsRef.current) observer.observe(skillsRef.current);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", icon: "/icons/java.png", color: "#f89820" },
        { name: "JavaScript", icon: "/icons/js.webp", color: "#f7df1e" },
        { name: "Python", icon: "/icons/Python.png", color: "#3776ab" }
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "Node.js", icon: "/icons/nodejs.webp", color: "#339933" },
        { name: "React.js", icon: "/icons/react.png", color: "#61dafb" },
        { name: "Express.js", icon: "/icons/express-js.png", color: "#000000" },
        { name: "HTML", icon: "/icons/html.png", color: "#e34f26" },
        { name: "CSS", icon: "/icons/css.png", color: "#1572b6" },
        { name: "Django", icon: "/icons/django.webp", color: "#092e20" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "PostgreSQL", icon: "/icons/pg.png", color: "#336791" },
        { name: "MongoDB", icon: "/icons/MongoDB.png", color: "#47a248" }
      ]
    },
    {
      title: "Core CS Concepts",
      skills: [
        { name: "Data Structures", icon: "/icons/ds.png", color: "#ff6b6b" },
        { name: "Algorithms", icon: "/icons/algorithm.svg", color: "#4ecdc4" },
        { name: "DBMS", icon: "/icons/dbms.png", color: "#45b7d1" },
        { name: "OOP", icon: "/icons/oops.webp", color: "#96ceb4" },
        { name: "Networking", icon: "/icons/cn.png", color: "#feca57" }
      ]
    }
  ];

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="skills__container">
        <h2 className="skills__heading">
          Skills & Expertise
          <span className="heading-accent"></span>
        </h2>
        
        <div className="skills__content">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-row">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-item"
                    style={{ 
                      '--delay': `${skillIndex * 0.2}s`,
                      '--skill-color': skill.color 
                    }}
                  >
                    <div className="skill-icon">
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="skill-logo"
                      />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}   