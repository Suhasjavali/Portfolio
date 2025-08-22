// src/components/Projects.jsx
import { useEffect, useRef } from "react";
import "./Projects.css";

export default function Projects() {
  const projectsRef = useRef(null);

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

    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => observer.disconnect();
  }, []);

  const projects = [
    
    {
      name: "Sunio Fixify",
      tools: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Razorpay"],
      myRole: "Full Stack Developer",
      description: "Developed an on-demand home service platform with a dynamic and responsive React.js frontend, focusing on intuitive user interfaces and optimized rendering for performance. Built a secure and scalable backend with Node.js and PostgreSQL, supporting efficient data flow and API integration. Integrated Razorpay for seamless and secure payment processing, enabling smooth user transactions. The platform enhances the overall user experience and streamlines service management. Prioritized accessibility, performance, and frontend best practices to deliver a high-quality, production-ready service booking interface.",
      date: "Dec 2024"
    }
  ];

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="projects__container">
        <h2 className="projects__heading">
          Featured Project
          <span className="heading-accent"></span>
        </h2>
        
        <div className="projects__content">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="code-editor">
                <div className="editor-header">
                  <div className="window-controls">
                    <div className="control red"></div>
                    <div className="control orange"></div>
                    <div className="control green"></div>
                  </div>
                  <div className="file-name">{project.name}</div>
                </div>
                <div className="code-content">
                  <pre className="code-block">
                    <code>
                      <span className="keyword">const</span> <span className="variable">project</span> = {'{'}<br/>
                      &nbsp;&nbsp;<span className="property">name</span>: <span className="string">'{project.name}'</span>,<br/>
                      &nbsp;&nbsp;<span className="property">tools</span>: [<br/>
                      {project.tools.map((tool, toolIndex) => (
                        <span key={toolIndex}>
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">'{tool}'</span>{toolIndex < project.tools.length - 1 ? ',' : ''}<br/>
                        </span>
                      ))}
                      &nbsp;&nbsp;],<br/>
                      &nbsp;&nbsp;<span className="property">myRole</span>: <span className="string">'{project.myRole}'</span>,<br/>
                      &nbsp;&nbsp;<span className="property">Description</span>: <span className="string">`{project.description}`</span><br/>
                      {'};'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
